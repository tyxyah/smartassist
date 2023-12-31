import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useAuthContext } from "../hooks/useAuthContext";

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Wrapper for the entire table and pagination
const TableWrapper = styled("div")({
  position: "relative",
});

// Wrapper for pagination with fixed position at the center bottom
const PaginationWrapper = styled("div")({
  position: "fixed",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
});

const CustomizedTables = ({ selectedCourseType }) => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8); 
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/study_scheme/StudyScheme11", {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCourses();
  }, [user.token]);

  // Filter completed courses based on the selected type
  const filteredCourses = courses.filter(
    (course) => parseInt(course.course_type) === selectedCourseType && course.status
  );

  // Event handler for changing the current page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Event handler for changing the number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableWrapper>
      {/* Container for the table */}
      <TableContainer sx={{ maxWidth: 790 }} component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ columnWidth: 2 }}>No.</StyledTableCell>
              <StyledTableCell sx={{ columnWidth: 118.25, align: "left" }}>
                Course Code
              </StyledTableCell>
              <StyledTableCell sx={{ columnWidth: 275, align: "left" }}>
                Course Name
              </StyledTableCell>
              <StyledTableCell sx={{ columnWidth: 118.25, textAlign: "center" }}>
                Credit
              </StyledTableCell>
              <StyledTableCell sx={{ columnWidth: 118.25, textAlign: "center" }}>
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course, index) => (
              <StyledTableRow key={course._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {index + 1 + page * rowsPerPage + "."}
                </StyledTableCell>
                <StyledTableCell align="left">{course.course_code}</StyledTableCell>
                <StyledTableCell align="left">{course.course_name}</StyledTableCell>
                <StyledTableCell align="center">
                  {course.credit_hours}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {course.status ? "Completed" : "Failed"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Container for the pagination with fixed position */}
      <PaginationWrapper>
        <TablePagination
          rowsPerPageOptions={[8]}
          component="div"
          count={filteredCourses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </PaginationWrapper>
    </TableWrapper>
  );
};

export default CustomizedTables;
