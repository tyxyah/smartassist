import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function WelcomeCard() {
  const [isCardVisible, setIsCardVisible] = useState(true);

  const handleDismiss = () => {
    setIsCardVisible(false);
    // Save in local storage that the user has seen the welcome card
    localStorage.setItem("hasSeenWelcomeCard", "true");
  };

  useEffect(() => {
    // Check if the user has seen the welcome card before
    const hasSeenWelcomeCard = localStorage.getItem("hasSeenWelcomeCard");
    if (hasSeenWelcomeCard === "true") {
      setIsCardVisible(false);
    }
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <>
      {isCardVisible && (
        <Card
          sx={{
            width: 740,
            position: "relative",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "row",
            padding: 3,
            backgroundColor: "#fff", // White background
            marginBottom: 2,
            borderRadius: 3,
            color: "#333", // Dark text color
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome to SmartAssist!
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Let's start by adding your academic history.
            </Typography>
            <Typography>
              Click "History" at the Sidebar to get started.
            </Typography>
            <Typography>
              It's a quick step that helps us personalize your journey. Excited
              to have you on board!
            </Typography>

            <Button
              onClick={handleDismiss}
              color="primary"
              variant="contained"
              sx={{
                marginTop: 3,
                padding: "8px 16px",
              }}
            >
              Dismiss
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
