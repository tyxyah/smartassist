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
import TablePagination from "@mui/material/TablePagination";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
    textAlign: "center", // Center horizontally
    verticalAlign: "middle", // Center vertically
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center", // Center horizontally
    verticalAlign: "middle", // Center vertically
  },
  "&.course-name": {
    textAlign: "left", // Align to the left for the 'course_name' cell
    verticalAlign: "middle", // Center vertically
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

const PaginationWrapper = styled("div")({
  position: "fixed",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
});

export default function CoursePlan({currentSemesterCourses,renderKey,setRenderKey}) {
  const [courses, setCourses] = useState([]);
  const [currentSemester, setCurrentSemester] = useState(0);
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const [bulkStatus, setBulkStatus] = useState(null); // Initialize with null
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const { user } = useAuthContext();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log("currentsss",currentSemesterCourses)
    if (currentSemesterCourses) {
      setCourses(currentSemesterCourses.courses);
      setCurrentSemester(currentSemesterCourses.current_semester);
      console.log(currentSemesterCourses.courses, currentSemesterCourses.current_semester)
  
      // Filter courses for the current semester
      const filteredCourses = currentSemesterCourses.courses.filter(
        (course) => course.semester_id === currentSemesterCourses.current_semester
      );
      setUpcomingCourses(filteredCourses);
  
      // Set the initial bulkStatus here based on some condition
      // For example, if all courses are completed, set bulkStatus to "completed"
      // Otherwise, set it to "failed"
      const allCompleted = filteredCourses.every((course) => course.status);
      setBulkStatus(allCompleted ? "completed" : "failed");
    } else {
      console.error(
        "Invalid or missing 'courses' property in the received data"
      );
    }
  }, [currentSemesterCourses]);  
  
  const handleStatusChange = (courseId, newStatus) => {
    const updatedCourses = courses.map((course) => {
      if (course._id === courseId) {
        course.status = newStatus === "completed";

        fetch(`http://localhost:4000/api/study_scheme/${course._id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
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
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSemesterCompletion = async () => {
    try {
      // Use a functional update to ensure the correct value is used
      setCurrentSemester(prevSemester => prevSemester + 1);
  
      const response = await fetch(`http://localhost:4000/api/student/update-current-semester`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ current_semester: currentSemester}), 
      });
  
      if (response.ok) {
        console.log("Status updated successfully");
        // Handle success, update state, or perform other actions
      } else {
        console.error("Failed to update status");
        // Handle failure, show error message, or perform other actions
      }
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle the error, show an error message, or perform other actions
    } finally {
      handleCloseDialog();
    }
  };  

  {/* const handleToggleBulkStatus = async () => {
    try {
      const newBulkStatus = bulkStatus === "completed" ? "failed" : "completed";
      console.log(`Bulk Status: ${newBulkStatus}`);
      setBulkStatus(newBulkStatus);

      const updatedCourses = await Promise.all(
        courses.map(async (course) => {
          if (course.semester_id === currentSemester) {
            const updatedCourse = {
              ...course,
              status: newBulkStatus === "completed",
            };

            console.log(
              `Updating status for course ${course._id} to ${updatedCourse.status}`
            );

            const response = await fetch(
              `http://localhost:4000/api/study_scheme/${course._id}`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${user.token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: updatedCourse.status }),
              }
            );

            if (response.ok) {
              console.log("Status updated successfully");
            } else {
              console.error("Failed to update status");
            }

            return updatedCourse;
          }

          return course;
        })
      );

      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error updating bulk status:", error);
    }
  }; */}

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          style={{ marginBottom: "15px" }}
        >
          <p style={{ fontSize: "18px" }}>
            Course Plan for Semester {currentSemester}
          </p>
        </Stack>
        <Stack paddingRight={6}>
        <Button onClick={handleOpenDialog}>Semester Completed</Button>
        </Stack>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Semester Completion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to mark the this semester as completed?</p>
          <em>Note: This action cannot be reversed</em>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSemesterCompletion} color="primary">
            Confirm
          </Button>
        </DialogActions>
     </Dialog>
        {/* <
          direction="row"
          alignItems="center"
          style={{ marginRight: "85px" }}
        >
          <div style={{ marginRight: "10px" }}>Mark All :</div>
          <ToggleButtonGroup
            exclusive
            value={bulkStatus}
            onChange={(_, newBulkStatus) => {
              setBulkStatus(newBulkStatus);
              handleToggleBulkStatus();
            }}
          >
            <ToggleButton value="failed">
              <ClearOutlinedIcon style={{ color: "red" }} />
            </ToggleButton>
            <ToggleButton value="completed">
              <CheckOutlinedIcon style={{ color: "green" }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>*/}
          </Stack>

      <TableContainer sx={{ maxWidth: 1050 }} component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ columnWidth: 2 }}>No.</StyledTableCell>
              <StyledTableCell sx={{ columnWidth: 118.25, align: "left" }}>
                Course Code
              </StyledTableCell>
              <StyledTableCell
                sx={{ columnWidth: 470, textAlign: "left" }}
                className={`${tableCellClasses.body} course-name`}
              >
                Course Name
              </StyledTableCell>
              <StyledTableCell sx={{ columnWidth: 118.25, textAlign: "left" }}>
                Credit
              </StyledTableCell>
              <StyledTableCell sx={{ columnWidth: 121.25, textAlign: "left" }}>
                Prerequisite
              </StyledTableCell>
              <StyledTableCell sx={{ columnWidth: 120.25, textAlign: "left" }}>
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? upcomingCourses.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : upcomingCourses
            ).map((course, index) => (
              <StyledTableRow key={course._id}>
                <StyledTableCell>
                  {index + 1 + page * rowsPerPage}.
                </StyledTableCell>
                <StyledTableCell>{course.course_code}</StyledTableCell>
                <StyledTableCell
                  className={`${tableCellClasses.body} course-name`}
                >
                  {course.course_name}
                </StyledTableCell>
                <StyledTableCell>{course.credit_hours}</StyledTableCell>
                <StyledTableCell>
                  {course.prerequisite}
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row">
                    <ToggleButtonGroup
                      value={course.status ? "completed" : "failed"}
                      exclusive
                      onChange={(event, newStatus) =>
                        handleStatusChange(course._id, newStatus)
                      }
                    >
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
      <PaginationWrapper>
        <TablePagination
          rowsPerPageOptions={[4]}
          component="div"
          count={upcomingCourses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </PaginationWrapper>
    </div>
  );
}
