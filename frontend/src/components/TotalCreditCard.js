import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { Divider, Stack, LinearProgress } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const TotalCreditCard = () => {
  const [progressData, setProgressData] = useState({});
  const { user } = useAuthContext();

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
          console.log("Received Data:", data.credit_hours_by_current_semester);
          setProgressData(data.credit_hours_by_current_semester);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  //const progressLevel = determineProgressLevel(parseFloat(progressData.progress));

  return (
    <div>
      <Typography sx={{ fontSize: "18px", marginBottom: 1, marginTop: 3 }}>
        Total Credit Hours{" "}
        <strong style={{ marginLeft: 10 }}>{progressData.totalCredit}</strong>
      </Typography>
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
                <Typography>{progressData.required}</Typography>
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
                <Typography>{progressData.completed}</Typography>
              </Stack>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={parseFloat(progressData.progress)}
              color={
                progressData.progress >= 66
                  ? "success"
                  : progressData.progress >= 33
                  ? "warning"
                  : "error"
              }
              sx={{
                height: 3,
              }}
            />
          </Stack>
        </CardContent>
      </Card>
      <div style={{ paddingTop: 2 }}>
        {progressData.progress !== undefined && (
          <Alert
            severity={
              progressData.progress >= 66
                ? "success"
                : progressData.progress >= 33
                ? "warning"
                : "error"
            }
            sx={{ width: "218px", marginTop: 2 }}
          >
            Progress: <strong>{progressData.progress}% On track</strong>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default TotalCreditCard;
