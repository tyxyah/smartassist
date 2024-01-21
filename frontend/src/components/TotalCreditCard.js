import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TrendingUp from "@mui/icons-material/TrendingUpRounded";
import TrendingDown from "@mui/icons-material/TrendingDownRounded";
import ShowFailedCoursesDialog from "../components/ShowFailedCoursesDialog";
import { useAuthContext } from "../hooks/useAuthContext";

const TotalCreditCard = () => {
  const [progressData, setProgressData] = useState({});
  const [completedData, setCompletedData] = useState({});
  const { user } = useAuthContext();
  const [isFailedCoursesDialogOpen, setFailedCoursesDialogOpen] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/dashboard/credit-hours-until-current-semester",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Received Data:", data.credit_hours_by_current_semester, data.credit_hours_to_graduate);
          setProgressData(data.credit_hours_by_current_semester);
          setCompletedData(data.credit_hours_to_graduate)
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleFailedCoursesDialogOpen = () => {
    setFailedCoursesDialogOpen(true);
  };

  const handleFailedCoursesDialogClose = () => {
    setFailedCoursesDialogOpen(false);
  };

  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          width: 175,
          minHeight: 100,
        }}
        onClick={handleFailedCoursesDialogOpen}
      >
        <Box sx={{ color: "text.secondary", marginBottom: 1 }}>
          Credit Completed
        </Box>
        <Box
          sx={{
            color: "text.primary",
            fontSize: 34,
            fontWeight: "medium",
            marginLeft: 1,
          }}
        >
          {completedData.completed}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: 14,
            fontWeight: "bold",
            alignItems: "center",
            color:
              completedData.completed - progressData.required < 0
                ? "#ff1744"
                : completedData.completed - progressData.required > 0
                ? "#009688"
                : "#009688",
          }}
        >
          {completedData.completed - progressData.required !== 0 ? (
            <>
              {completedData.completed - progressData.required < 0 ? (
                <TrendingDown sx={{ marginRight: 0.5, display: "inline" }} />
              ) : (
                <>
                  <TrendingUp sx={{ marginRight: 0.5, display: "inline" }} />
                  {/* Conditionally render TrendingUp icon */}
                </>
              )}
              {completedData.completed - progressData.required < 0 ? "-" : "+"}
              {Math.abs(completedData.completed - progressData.required)} Credit
            </>
          ) : (
            "On track"
          )}
        </Box>
      </Box>
      {/* Include the ShowFailedCoursesDialog component */}
      <ShowFailedCoursesDialog
        open={isFailedCoursesDialogOpen}
        handleClose={handleFailedCoursesDialogClose}
      />
    </div>
  );
};

export default TotalCreditCard;
