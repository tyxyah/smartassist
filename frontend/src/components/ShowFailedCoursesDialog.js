import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useAuthContext } from "../hooks/useAuthContext";

const ShowFailedCoursesDialog = ({ open, handleClose }) => {
  const [failedCourses, setFailedCourses] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFailedCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/study_scheme", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Filter for failed courses based on current semester
          const filteredFailedCourses = data.courses.filter(
            (course) =>
              !course.status && course.semester_id < data.current_semester
          );
          setFailedCourses(filteredFailedCourses);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (open) {
      fetchFailedCourses();
    }
  }, [open, user]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>List of Failed Courses</DialogTitle>
      <Divider />
      <DialogContent>
        {failedCourses.length === 0 ? (
          <Typography>No failed courses. You are on track!</Typography>
        ) : (
          <List>
            {failedCourses.map((course, index) => (
              <React.Fragment key={course.course_code}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: 2,
                    backgroundColor:
                      index % 2 === 0 ? "#f0f0f0" : "transparent", // Add alternating background color
                  }}
                >
                  <ListItemText
                    primary={`${index + 1}. ${course.course_code}`}
                    sx={{ fontSize: 16, fontWeight: "bold", marginBottom: 1 }}
                  />
                  <ListItemText
                    secondary={
                      <div>
                        <Typography variant="body2">
                          {course.course_name}
                        </Typography>
                        <Typography variant="body2">
                          Semester ID: {course.semester_id}
                        </Typography>
                        <Typography variant="body2">
                          Credit Hours: {course.credit_hours}
                        </Typography>
                      </div>
                    }
                  />
                </ListItem>
                {index < failedCourses.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowFailedCoursesDialog;
