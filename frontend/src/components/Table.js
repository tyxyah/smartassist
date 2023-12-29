import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useAuthContext } from "../hooks/useAuthContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold"
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

export default function CustomizedTables({selectedSemester}) {
  const [courses, setCourses] = useState([]);
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/study_scheme/StudyScheme12", {
          headers: {
            'Authorization':`Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Log the user payload
          setCourses(data);
        } else {
          console.error(`Failed to fetch data : ${JSON.stringify(user)}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      }
      
      if (user) {
        fetchCourses();
    };

    
  }, [user]);

  const handleStatusChange = (event, courseId) => {
    const newStatus = event.target.value;
    const updatedCourses = courses.map((course) => {
      if (course._id === courseId) {
        // Update the status of the selected course
        course.status = newStatus === "Completed" ? true : false;

        // Call API to update the status in the database using fetch
        fetch(`http://localhost:4000/api/study_scheme/StudyScheme12/${course._id}`, {
          method: "PATCH",
          // Headers indicates that request body contains JSON data
          headers: {
            "Content-Type": "application/json",
            //this header used to give authorization to fetch the data of a specific user token
            'Authorization':`Bearer ${user.token}`
          },
          body: JSON.stringify({ status: course.status }),
        }).then((response) => {
          if (response.ok) {
            console.log("Status updated successfully");
          } else {
            console.error("Failed to update status");
          }
        });

        return course;
      }
      return course;
    });

    setCourses(updatedCourses);
  };

   // Filter courses based on the selected semester
   const filteredCourses = courses.filter((course) => course.semester_id === selectedSemester);

  return (
    <TableContainer sx={{ maxWidth: 950 }} component={Paper}>
      <Table sx={{ minWidth: 950 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{columnWidth: 2}}>No.</StyledTableCell>
            <StyledTableCell sx={{columnWidth: 118.25, align:"left"}}>Course Code</StyledTableCell>
            <StyledTableCell sx={{columnWidth: 475, align:"left"}}>Course Name</StyledTableCell>
            <StyledTableCell sx={{columnWidth: 118.25, textAlign:"center"}}>Credit Hours</StyledTableCell>
            <StyledTableCell sx={{columnWidth: 118.25, textAlign:"center"}}>Prerequisite</StyledTableCell>
            <StyledTableCell sx={{columnWidth: 118.25, textAlign:"center"}}>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {filteredCourses.map((course, index) => (
            <StyledTableRow key={course._id}>
              <StyledTableCell align="center" component="th" scope="row">
                {index + 1 + "."}
              </StyledTableCell>
              <StyledTableCell align="left">{course.course_code}</StyledTableCell>
              <StyledTableCell align="left">{course.course_name}</StyledTableCell>
              <StyledTableCell align="center">
                {course.credit_hours}
              </StyledTableCell>
              <StyledTableCell align="center">
                {course.prerequisite}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Select
                  value={course.status ? "Completed" : "Failed"}
                  onChange={(event) => handleStatusChange(event, course._id)}
                  sx={{width: 125, align: "center"}}
                  size="small"
                >
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                </Select>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
