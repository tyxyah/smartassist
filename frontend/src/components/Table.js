import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
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
import TablePagination from "@mui/material/TablePagination";
import { useAuthContext } from "../hooks/useAuthContext";

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

const CustomizedTables = forwardRef(({ selectedSemester,courses,setCourses,fetchCourses}, ref) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [prerequisiteData, setPrerequisiteData] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    // Fetch prerequisite data from the API
    const fetchPrerequisiteData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/study_scheme");
        if (response.ok) {
          const data = await response.json();
          setPrerequisiteData(data);
        } else {
          console.error("Failed to fetch prerequisite data");
        }
      } catch (error) {
        console.error("Error fetching prerequisite data:", error);
      }
    };

    fetchPrerequisiteData();
  }, []); // Run once when the component mounts

  // Function to check if a course's prerequisite is completed
  const isPrerequisiteCompleted = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    if (!course || !course.prerequisite) {
      return true; // If no prerequisite or course not found, consider it completed
    }

    // Check if the prerequisite course is marked as completed
    const prerequisiteCourse = prerequisiteData.find((c) => c._id === course.prerequisite);
    return prerequisiteCourse && prerequisiteCourse.status === "Completed";
  };
  
  const handleStatusChange = (event, courseId) => {
    const newStatus = event.target.value;
    const updatedCourses = courses.map((course) => {
      if (course._id === courseId) {
        course.status = newStatus === "Completed";
        fetch(`http://localhost:4000/api/study_scheme/${course._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
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
    fetchCourses();
  }; 

  const filteredCourses = courses.filter(
    (course) => course.semester_id === selectedSemester
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

// Function to handle completion of all courses for a specific semester
const handleAllCoursesCompleted = async () => {
  try {
    const updatedCourses = await Promise.all(
      filteredCourses.map(async (course) => {
        // Update the course status on the server
        await fetch(`http://localhost:4000/api/study_scheme/update-all`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            courseId: course._id,
            status: "Completed",
            semesterId: selectedSemester,
          }),
        });

        // Return the updated course directly or the original course if not found
        return filteredCourses.find((c) => c._id === course._id) || course;
      })
    );

    // Update the local state with the new course statuses
    setCourses(updatedCourses);
  } catch (error) {
    console.error("Error marking all courses as completed:", error);
  }
};

  // Expose the function via ref
  useImperativeHandle(ref, () => ({
    handleAllCoursesCompleted,
  }));

  return (
    <TableWrapper>
      <TableContainer sx={{ maxWidth: 790 }} component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="customized table">
          <caption># : Tidak dikira dalam kredit bergraduat</caption>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ columnWidth: 2 }}>No.</StyledTableCell>
              <StyledTableCell sx={{ columnWidth: 118.25, align: "left" }}>
                Code
              </StyledTableCell>
              <StyledTableCell sx={{ columnWidth: 475, align: "left" }}>
                Course Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ columnWidth: 118.25, textAlign: "center" }}
              >
                Credit
              </StyledTableCell>
              <StyledTableCell
                sx={{ columnWidth: 118.25, textAlign: "center" }}
              >
                Prerequisite
              </StyledTableCell>
              <StyledTableCell
                sx={{ columnWidth: 118.25, textAlign: "center" }}
              >
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((course, index) => (
                <StyledTableRow key={course._id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {index + 1 + page * rowsPerPage + "."}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {course.course_code}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {course.course_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {course.credit_hours}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {course.prerequisite}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Select
                      value={course.status ? "Completed" : "Failed"}
                      onChange={(event) =>
                        handleStatusChange(event, course._id)
                      }
                      sx={{ width: 125, align: "center" }}
                      size="small"
                      //disabled={!isPrerequisiteCompleted(course._id)}
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

      <PaginationWrapper>
        <TablePagination
          rowsPerPageOptions={[6]}
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
});

export default CustomizedTables;
