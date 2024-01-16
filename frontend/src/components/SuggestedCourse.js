import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  CardActions,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { red, teal, deepPurple } from "@mui/material/colors";
import { useAuthContext } from "../hooks/useAuthContext";
import AddCourseDialog from "./AddCourseDialog";
import Alert from "@mui/material/Alert";
import Slider from "react-slick";
import Box from "@mui/material/Box";

const SuggestedCourses = () => {
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    // Make the network request to get suggested courses
    async function fetchSuggestedCourses() {
      try {
        const response = await fetch(
          `http://localhost:4000/api/study_scheme/suggest-failed-courses`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch suggested courses: ${response.statusText}`
          );
        }

        const data = await response.json();
        setSuggestedCourses(data.suggestedCourses);
      } catch (error) {
        console.error("Error fetching suggested courses:", error);
      }
    }

    fetchSuggestedCourses();
    setSelectedCourse(null);
  }, [user]);

  const handleAddCourseClick = async (course) => {
    try {
      // Make a request to the backend to check prerequisites
      const prerequisiteCheckResponse = await fetch(
        'http://localhost:4000/api/study_scheme/check-prerequisites',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseCode: course.course_code }),
        }
      );
  
      if (!prerequisiteCheckResponse.ok) {
        throw new Error(`Failed to check prerequisites: ${prerequisiteCheckResponse.statusText}`);
      }
  
      const prerequisiteCheckData = await prerequisiteCheckResponse.json();
  
      if (prerequisiteCheckData.prerequisitesCompleted) {
        // Prerequisites are completed, allow user to add the course
        setSelectedCourse(course);
        setDialogOpen(true);
      } else {
        // Display an alert with a message when prerequisites are not completed
        const errorMessage = `Cannot add course ${course.course_code}. Prerequisite not completed.`;
        window.alert(errorMessage);
        console.error(errorMessage);
        // You can also update state to show an error message to the user in the UI
      }
    } catch (error) {
      console.error('Error checking prerequisites:', error);
    }
  };  

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = async () => {
    try {
      // Fetch the current semester
      const currentSemesterResponse = await fetch(
        "http://localhost:4000/api/study_scheme",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!currentSemesterResponse.ok) {
        throw new Error(
          `Failed to fetch current semester: ${currentSemesterResponse.statusText}`
        );
      }

      const data = await currentSemesterResponse.json();
      const currentSemester = data.current_semester;

      // Make a network request to update the course's semester_id
      const response = await fetch(
        `http://localhost:4000/api/study_scheme/${selectedCourse._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ semester_id: currentSemester }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update semester: ${response.statusText}`);
      }

      // Update the suggested courses list after updating the semester_id
      const updatedCourses = suggestedCourses.filter(
        (course) => course._id !== selectedCourse._id
      );
      setSuggestedCourses(updatedCourses);

      // Close the dialog
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating semester:", error);
    }
  };

  // Modified getAvatarData to accept course_type
  const getAvatarData = (courseType) => {
    switch (courseType) {
      case "1":
        return { value: "U", color: teal[500] };
      case "2":
        return { value: "C", color: red[500] };
      case "3":
        return { value: "EL", color: deepPurple[500] };
      default:
        return { value: "O", color: "grey" };
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true,
  };

  return (
    <div>
      {suggestedCourses.length === 0 ? (
        <Alert severity="success" style={{ width: "1020px", margin: "20px 0" }}>
          Keep up the great work! You're on the right track! 🔥
        </Alert>
      ) : (
        <Slider
          {...settings}
          className="beautiful-carousel"
          style={{ width: "1020px" }}
        >
          {suggestedCourses.map((course, index) => {
            const avatarData = getAvatarData(course.course_type);

            return (
              <div key={index} className="slick-slide">
                <Card
                  key={index}
                  style={{
                    width: "325px",
                    height: "105px",
                    margin: "2px 10px 10px 10px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardActions
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 0,
                      transform: "translateY(-50%)",
                      "& button": {
                        minWidth: "auto",
                        minHeight: "auto",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      },
                    }}
                  >
                    <Button
                      style={{
                        minWidth: "auto",
                        minHeight: "auto",
                      }}
                      onClick={() => handleAddCourseClick(course)}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </Button>
                  </CardActions>
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center", // Center vertically
                      textAlign: "left", // Align content to the left horizontally
                    }}
                  >
                    <Box>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flex: "1",
                          marginRight: "17px",
                        }}
                      >
                        <Avatar sx={{ bgcolor: avatarData.color }}>
                          {avatarData.value}
                        </Avatar>
                        <div style={{ flex: "1", marginLeft: "12px" }}>
                          <Typography
                            variant="h6"
                            style={{ fontSize: "1.1em" }}
                          >
                            {course.course_code}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              whiteSpace: "normal",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {course.course_name}
                          </Typography>
                          {/* Add additional information here if needed */}
                        </div>
                      </div>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </Slider>
      )}
      <AddCourseDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        handleConfirm={handleDialogConfirm}
      />
    </div>
  );
};

export default SuggestedCourses;
