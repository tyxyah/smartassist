import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { useAuthContext } from "../hooks/useAuthContext";

export default function HistoryTable() {
  const [page, setPage] = useState(0);
  const [progressData, setProgressData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const { user } = useAuthContext();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/dashboard/credit-hours-by-semester",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Received Data:", data.credit_hours_by_semester);
          setProgressData(data.credit_hours_by_semester);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div style={{ width: 520 }}>
      <p style={{ fontSize: "18px" }}>Registration History</p>
      <TableContainer component={Paper} sx={{ width: 515, borderRadius: 1 }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#1565C0",
                  color: "white",
                  fontWeight: 525,
                }}
              >
                Semester ID
              </TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#1565C0",
                  color: "white",
                  fontWeight: 525,
                }}
              >
                Required Credit Hours
              </TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#1565C0",
                  color: "white",
                  fontWeight: 525,
                }}
              >
                Completed Credit Hours
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(progressData)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(([semesterId, row], index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{semesterId}</TableCell>
                  <TableCell align="center">{row.required}</TableCell>
                  <TableCell align="center">
                    <Tooltip
                      title={
                        row.completed < row.required
                          ? "You did not fulfill the required credit hours for this semester"
                          : ""
                      }
                      arrow
                      placement="right"
                    >
                      <span
                        style={{
                          color: row.completed < row.required ? "red" : "green",
                          fontWeight: "bold",
                        }}
                      >
                        {row.completed}
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* TablePagination component rendered right below the Table */}
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={Object.keys(progressData).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
