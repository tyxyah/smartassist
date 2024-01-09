import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const ElexCard = ({ title, data }) => {
  return (
    <Card
      className="dashboard-card"
      style={{
        minWidth: "248px",
        borderRadius: 3,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <CardContent>
        <Typography
          variant="body"
          component="div"
          sx={{ fontWeight: 500, textAlign: "left" }}
        >
          {title}
        </Typography>
        {data.map((course, index) => (
          <Stack direction={"column"}>
            <Stack
              key={index}
              direction="row"
              spacing={2}
              paddingLeft={4}
              alignItems="center"
              marginTop="10px"
              marginY={2}
            >
              <Stack
                direction="column"
                alignItems="center" // Set this to center
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
                <Typography>{course.required}</Typography>
              </Stack>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Stack
                direction="column"
                alignItems="center" // Set this to center
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
                  Earned
                </Typography>
                <Typography>{course.earned}</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <LinearProgress
                variant="determinate"
                value={course.progress}
                sx={{ height: 10, width: "100%" }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
              >{`${course.progress}%`}</Typography>
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
};

// Example data for different types of courses
export const LAXProgress = [
  { progress: 12, earned: 2, required: 3 },
  // Add more courses as needed
];

export const CELProgress = [
  { progress: 50, earned: 6, required: 24 },
  // Add more courses as needed
];

export const LPEProgress = [
  { progress: 30, earned: 2, required: 2 },
  // Add more courses as needed
];

export default ElexCard;
