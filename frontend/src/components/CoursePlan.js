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
import { mapCourseType } from "../components/CourseUtils"; 

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CoursePlan() {
  const [courses, setCourses] = useState([]);
  const [upcomingCourses, setUpcomingCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch("http://localhost:4000/api/user/64fc2560fbeb499208c719e7", {
          // Add any necessary headers for user authentication
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const currentSemester = userData.current_semester;

          const courseResponse = await fetch("http://localhost:4000/api/course");
          if (courseResponse.ok) {
            const courseData = await courseResponse.json();
            setCourses(courseData);

            const upcomingCourses = courseData.filter(course => course.semester === currentSemester + 1);
            setUpcomingCourses(upcomingCourses);
          } else {
            console.error("Failed to fetch course data");
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (event, courseId) => {
    const newStatus = event.target.value;
    const updatedCourses = courses.map(course => {
      if (course._id === courseId) {
        course.status = newStatus === "completed";

        fetch(`http://localhost:4000/api/course/${course._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: course.status }),
        }).then(response => {
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

  var pageWidth = window.innerWidth;
  var maxWidth78 = pageWidth * 0.78;

  return (
    <TableContainer sx={{ display: "flex", maxWidth: maxWidth78 }} component={Paper}>
      <Table sx={{ minWidth: 950 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ columnWidth: 2 }}>No.</StyledTableCell>
            <StyledTableCell sx={{ columnWidth: 118.25, align: "left" }}>
              Course Code
            </StyledTableCell>
            <StyledTableCell sx={{ columnWidth: 300, align: "left" }}>
              Course Name
            </StyledTableCell>
            <StyledTableCell sx={{ columnWidth: 118.25, textAlign: "left" }}>
              Credit Hours
            </StyledTableCell>
            <StyledTableCell sx={{ columnWidth: 118.25, textAlign: "left" }}>
              Course Type
            </StyledTableCell>
            <StyledTableCell sx={{ columnWidth: 118.25, textAlign: "left" }}>
              Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcomingCourses.map((course, index) => (
            <StyledTableRow key={course._id}>
              <StyledTableCell>{index + 1}.</StyledTableCell>
              <StyledTableCell>{course.code}</StyledTableCell>
              <StyledTableCell>{course.name}</StyledTableCell>
              <StyledTableCell>{course.credit_hrs}</StyledTableCell>
              <StyledTableCell>{mapCourseType(course.course_type)}</StyledTableCell>
              <StyledTableCell>
                <Stack direction="row">
                  <ToggleButtonGroup>
                    <ToggleButton value="failed">
                      <ClearOutlinedIcon style={{ color: "red" }} />
                    </ToggleButton>
                    <ToggleButton value="completed">
                      <CheckOutlinedIcon style={{ color: "green" }} />
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
