import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { Divider, Stack, LinearProgress } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const TotalKokurikulum = () => {
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
      <Stack direction={"row"} alignItems="center" spacing={1.5} marginTop={2}>
        <p style={{ fontSize: "18px" }}>Co-Curriculum</p>
      </Stack>
      <Card
        className="dashboard-card"
        style={{
          width: "248px",
          borderRadius: 3,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <CardContent>
          <Stack direction={"column"}>
            <Stack
              direction="row"
              spacing={2}
              paddingLeft={2.5}
              alignItems="center"
              marginTop="10px"
              marginY={2}
            >
              <Stack
                direction="column"
                alignItems="center"
                spacing={1}
                sx={{ minWidth: "60px" }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "text.secondary",
                  }}
                >
                  Required
                </Typography>
                <Typography>
                  {totalProgressUntilCurrentSemester.required || 0}
                </Typography>
              </Stack>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Stack
                direction="column"
                alignItems="center"
                spacing={1}
                sx={{ minWidth: "60px" }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "text.secondary",
                  }}
                >
                  Completed
                </Typography>
                <Typography>
                  {totalProgressUntilCurrentSemester.completed || 0}
                </Typography>
              </Stack>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={parseFloat(totalProgressUntilCurrentSemester.progress) || 0}
              color={
                totalProgressUntilCurrentSemester.progress >= 66
                  ? "success"
                  : totalProgressUntilCurrentSemester.progress >= 33
                  ? "warning"
                  : "error"
              }
              sx={{
                height: 4,
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      <div style={{ paddingTop: 2 }}>
        {totalProgressUntilCurrentSemester.progress !== undefined && (
          <Alert
            severity={
              totalProgressUntilCurrentSemester.progress >= 66
                ? "success"
                : totalProgressUntilCurrentSemester.progress >= 33
                ? "warning"
                : "error"
            }
            sx={{ width: "218px", marginTop: 2 }}
          >
            Progress:{" "}
            <strong>
              {totalProgressUntilCurrentSemester.progress}% On track
            </strong>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default TotalKokurikulum;
