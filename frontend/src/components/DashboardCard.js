import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularWithValueLabel from "./CircularLabel";
import { Stack, Divider } from "@mui/material";

const DashboardCard = ({ title, data}) => {
  return (
    <Card
      className="dashboard-card"
      style={{
        minWidth: "248px",
        height: "255px", // Increased height to accommodate circular progress
        borderRadius: 3,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      <CardContent>
        <Typography
          variant="body"
          component="div"
          sx={{ fontWeight: 500, marginBottom: "10px", textAlign: "left" }}
        >
          {title}
        </Typography>
        {data.map((courseType, index) => (
          <div key={index}>
            <CircularWithValueLabel value={courseType.progress} />
          </div>
        ))}
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
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
};

// Example data for different types of courses
export const coreProgress = [
  { progress: 75, earned: 2, required: 3 },
  // Add more courses as needed
];

export const uniProgress = [
  { progress: 90, earned: 2, required: 3 },
  // Add more courses as needed
];

export const electiveProgress = [
  { progress: 90, earned: 2, required: 3 },
  // Add more courses as needed
];

export default DashboardCard;
