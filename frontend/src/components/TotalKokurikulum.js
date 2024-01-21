import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TrendingUp from "@mui/icons-material/TrendingUpRounded";
import TrendingDown from "@mui/icons-material/TrendingDownRounded";
import DoneIcon from "@mui/icons-material/DoneRounded";
import { useAuthContext } from "../hooks/useAuthContext";

const TotalKokurikulum = ({ showAlert = true }) => {
  const [progressData, setProgressData] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/dashboard/kokurikulum-progress",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Received Data:", data);
          setProgressData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  // Extract total progress for kokurikulum_progress
  const totalProgressUntilCurrentSemester =
    progressData.kokurikulum_progress?.Ko || {};

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
      >
        <Box sx={{ color: "text.secondary", marginBottom: 1 }}>
          Co-curricular
        </Box>
        <Box
          sx={{
            color: "text.primary",
            fontSize: 34,
            fontWeight: "medium",
            marginLeft: 1,
          }}
        >
          {totalProgressUntilCurrentSemester.completed || 0}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            color:
              totalProgressUntilCurrentSemester.completed -
                totalProgressUntilCurrentSemester.required ===
              0
                ? "#009688" // color for complete status
                : totalProgressUntilCurrentSemester.completed -
                    totalProgressUntilCurrentSemester.required <
                  0
                ? "#ff1744" // color for negative status
                : "#009688", // color for positive status
            fontSize: 14,
            fontWeight: "bold",
            alignItems: "center",
          }}
        >
          {totalProgressUntilCurrentSemester.completed -
            totalProgressUntilCurrentSemester.required <
          0 ? (
            <TrendingDown sx={{ marginRight: 0.5, display: "inline" }} />
          ) : totalProgressUntilCurrentSemester.completed -
              totalProgressUntilCurrentSemester.required >
            0 ? (
            <TrendingUp sx={{ marginRight: 0.5, display: "inline" }} />
          ) : (
            <DoneIcon sx={{ marginRight: 0.5, display: "inline" }} />
          )}
          {totalProgressUntilCurrentSemester.completed -
            totalProgressUntilCurrentSemester.required !==
          0 ? (
            <>
              {totalProgressUntilCurrentSemester.completed -
                totalProgressUntilCurrentSemester.required <
              0
                ? "-"
                : "+"}
              {Math.abs(
                totalProgressUntilCurrentSemester.completed -
                  totalProgressUntilCurrentSemester.required
              )}{" "}
              Subject
            </>
          ) : (
            <>Complete</>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default TotalKokurikulum;
