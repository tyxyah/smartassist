import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import picture from "../assets/dashboard.png";
import { useAuthContext } from "../hooks/useAuthContext";

export default function WelcomeCard() {
  const [isCardVisible, setIsCardVisible] = useState(true);
  const { user } = useAuthContext();
  const [matricNum, setMatricNum] = useState(); 

  const handleDismiss = () => {
    setIsCardVisible(false);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/student", {
            method: "GET",
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setMatricNum(data.username);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCourses();
  }, [user.token]);

  return (
    <>
      {isCardVisible && (
        <Card
          sx={{
            width: 550,
            height: 200,
            position: "relative",
            borderRadius: 3,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
            display: "flex",
            flexDirection: "row", // Ensure image and content are side by side
            padding: 2, // Adjust the padding as needed
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "#3349B3", // Dark blue font color
                fontWeight: "bold",
              }}
              gutterBottom
            >
              Welcome Back, {matricNum}!
            </Typography>
            <Typography sx={{ color: "#1B5AB9" }}>
              We're excited to have you here! Use this dashboard to keep track
              of your academic journey.
            </Typography>
            <Button
              onClick={handleDismiss}
              color="primary"
              variant="contained"
              sx={{
                marginTop: 2, // Adjust top margin as needed
                backgroundColor: "#1B5AB9", // Dark blue background color
                "&:hover": {
                  backgroundColor: "#1565C0", // Darker blue on hover
                },
                padding: "6px 12px", // Adjust padding to make the button smaller
                fontSize: "0.8rem", // Adjust font size to make the button smaller
              }}
            >
              Dismiss
            </Button>
          </CardContent>
          <CardMedia
            component="img"
            height="100%"
            width="50px" // Adjust the width to make the image smaller
            alt="Dashboard"
            image={picture}
            sx={{ borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }}
          />
        </Card>
      )}
    </>
  );
}
