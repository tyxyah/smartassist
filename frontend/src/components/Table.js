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
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
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

  return (
    <TableContainer sx={{ maxWidth: 950 }} component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell>Course Code</StyledTableCell>
            <StyledTableCell align="left">Course Name</StyledTableCell>
            <StyledTableCell align="left">Credit Hours</StyledTableCell>
            <StyledTableCell align="left">Prerequisite</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, index) => (
            <StyledTableRow key={course._id}>
              <StyledTableCell component="th" scope="row">
              {index + 1 + '.'} 
              </StyledTableCell>
              <StyledTableCell align="left">{course.code}</StyledTableCell>
              <StyledTableCell align="left">{course.name}</StyledTableCell>
              <StyledTableCell align="left">
                {course.credit_hrs}
              </StyledTableCell>
              <StyledTableCell align="left">
                {course.prerequisite ? "Yes" : "No"}
              </StyledTableCell>
              <StyledTableCell align="left">
                {course.status}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
