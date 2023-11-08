import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

//set table margin to 78 percent
var pageWidth = window.innerWidth;
var maxWidth78 = pageWidth * 0.78;

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

export default function CustomizedTables({ selectedSemester }) {
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

  const handleStatusChange = (event, courseId) => {
    const newStatus = event.target.value;
    const updatedCourses = courses.map((course) => {
      if (course._id === courseId) {
        // Update the status of the selected course
        course.status = newStatus === "Completed" ? true : false;

        // Call API to update the status in the database using fetch
        fetch(`http://localhost:4000/api/course/${course._id}`, {
          method: "PATCH",
          // Headers indicates that request body contains JSON data
          headers: {
            "Content-Type": "application/json",
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
  const filteredCourses = courses.filter(
    (course) => course.semester === selectedSemester
  );

  return (
    <TableContainer
      sx={{ display: "flex", maxWidth: maxWidth78 }}
      component={Paper}
    >
      <Table sx={{ minWidth: 950 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ columnWidth: 2 }}>No.</StyledTableCell>
            <StyledTableCell sx={{ columnWidth: 118.25, align: "left" }}>
              Course Code
            </StyledTableCell>
            <StyledTableCell sx={{ columnWidth: 475, align: "left" }}>
              Course Name
            </StyledTableCell>
            <StyledTableCell sx={{ columnWidth: 118.25, textAlign: "center" }}>
              Credit Hours
            </StyledTableCell>
            <StyledTableCell sx={{ columnWidth: 118.25, textAlign: "center" }}>
              Course Type
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
              <StyledTableCell align="center">{course.type}</StyledTableCell>
              <StyledTableCell align="center">
                <Stack direction="row">
                  <ToggleButtonGroup
                    style={{
                      minWidth: "auto",
                      minHeight: "auto",
                    }}
                    onClick={() => handleStatusChange()}
                  >
                    <ToggleButton value="failed">
                      <ClearOutlinedIcon style={{ color: "red" }} />{" "}
                      {/* Set color to red */}
                    </ToggleButton>
                    <ToggleButton value="completed">
                      <CheckOutlinedIcon style={{ color: "green" }} />{" "}
                      {/* Set color to green */}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
