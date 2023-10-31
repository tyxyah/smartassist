import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

export default function CustomizedTables({ selectedCourseType }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/course");
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
  }, []);

  // Filter courses based on the selected type
  const filteredCourses = courses.filter((course) => course.course_type === selectedCourseType);

  return (
    <TableContainer sx={{ maxWidth: 750 }} component={Paper}>
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
              Credit Hours
            </StyledTableCell>
            <StyledTableCell sx={{ columnWidth: 118.25, textAlign: "center" }}>
              Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCourses.map((course, index) => (
            <StyledTableRow key={course._id}>
              <StyledTableCell align="center" component="th" scope="row">
                {index + 1 + "."}
              </StyledTableCell>
              <StyledTableCell align="left">{course.code}</StyledTableCell>
              <StyledTableCell align="left">{course.name}</StyledTableCell>
              <StyledTableCell align="center">
                {course.credit_hrs}
              </StyledTableCell>
              <StyledTableCell align="center">
                {course.status ? "Completed" : "Failed"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}