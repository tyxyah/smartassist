import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import {
  Divider,
  Stack,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ShowFailedCoursesDialog from "../components/ShowFailedCoursesDialog";
import { useAuthContext } from "../hooks/useAuthContext";

const TotalCreditCard = () => {
  const [progressData, setProgressData] = useState({});
  const { user } = useAuthContext();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isFailedCoursesDialogOpen, setFailedCoursesDialogOpen] = useState(false);

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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFailedCoursesDialogOpen = () => {
    setFailedCoursesDialogOpen(true);
  };

  const handleFailedCoursesDialogClose = () => {
    setFailedCoursesDialogOpen(false);
  };

  return (
    <div>
      <Stack direction={"row"} alignItems="center" spacing={1.5} marginTop={2}>
        <p style={{ fontSize: "18px" }}>Total Credit Hours</p>
        <strong>{progressData.totalCredit}</strong>
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
                onClick={handleDialogOpen}
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
                onClick={handleFailedCoursesDialogOpen}
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
                height: 4,
              }}
            />
          </Stack>
        </CardContent>
      </Card>
      {/* Include the ShowFailedCoursesDialog component */}
      <ShowFailedCoursesDialog
        open={isFailedCoursesDialogOpen}
        handleClose={handleFailedCoursesDialogClose}
      />
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle variant="body1">Description</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Required</strong>
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, marginLeft: 2 }}>
            Represents total credit hours you need to complete by the end of the
            current semester.
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Completed</strong>
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 2, marginLeft: 2, marginRight: 2 }}
          >
            Represents total credit hours you have successfully completed.
          </Typography>

          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ marginTop: 2, fontSize: 14 }}
          >
            <em>
              Note: The percentage completion is a measure of your progress
              according to the study scheme. It ensures you stay on track with
              the credits completed until the current semester, not reflecting
              the overall graduation percentage.
            </em>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
