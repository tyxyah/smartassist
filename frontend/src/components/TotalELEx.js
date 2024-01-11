import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import {
  Divider,
  Stack,
  LinearProgress
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const TotalELEx = () => {
  const [progressData, setProgressData] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/dashboard/elex-package-progress",
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

  // Extract total progress for elex_package_progress_until_current_semester
  const {
    required: requiredProgress,
    completed: completedProgress,
    progress: totalProgress,
  } = progressData.elex_package_progress_until_current_semester?.total || {};

  const progressColor =
    totalProgress >= 66
      ? "success"
      : totalProgress >= 33
      ? "warning"
      : "error";

  const linearProgressStyles = {
    height: 4,
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={1.5} marginTop={2}>
        <p style={{ fontSize: "18px" }}>ELEx Package</p>
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
          <Stack direction="column">
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
                  variant="subtitle2"
                  sx={{
                    fontWeight: "500",
                    color: "text.secondary",
                  }}
                >
                  Required
                </Typography>
                <Typography>{requiredProgress || 0}</Typography>
              </Stack>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Stack
                direction="column"
                alignItems="center"
                spacing={1}
                sx={{ minWidth: "60px" }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "500",
                    color: "text.secondary",
                  }}
                >
                  Completed
                </Typography>
                <Typography>{completedProgress || 0}</Typography>
              </Stack>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={parseFloat(totalProgress) || 0}
              color={progressColor}
              sx={linearProgressStyles}
            />
          </Stack>
        </CardContent>
      </Card>

      <div style={{ paddingTop: 2 }}>
        {totalProgress !== undefined && (
          <Alert
            severity={progressColor}
            sx={{ width: "218px", marginTop: 2 }}
          >
            Progress:{" "}
            <strong>{totalProgress}% On track</strong>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default TotalELEx;
