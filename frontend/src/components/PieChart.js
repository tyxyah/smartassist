import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";
import DoneIcon from "@mui/icons-material/Done";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { useAuthContext } from "../hooks/useAuthContext";
import PendingIcon from "@mui/icons-material/Pending";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const size = {
  width: 300,
  height: 200,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const palette = ["#1976D2", "#A7CAED"];

// Function to calculate total credit hours
const calculateTotalCreditHours = (courses) => {
  return courses.reduce((total, course) => total + parseInt(course.credit_hours, 10), 0);
};

// Function to calculate needed total credit hours for a specific course type
const calculateNeededTotalCreditHours = (selectedCourseType, courses) => {
  // Filter courses based on the selected type and only include completed courses
  const filteredCourses = courses.filter(
    (course) => parseInt(course.course_type) === selectedCourseType
  );

  // Calculate total needed credit hours
  return filteredCourses.reduce((total, course) => total + parseInt(course.credit_hours, 10), 0);
};

const calculateProgressData = (selectedCourseType, courses) => {
  const filteredCourses = courses.filter(
    (course) => parseInt(course.course_type) === selectedCourseType && course.status
  );

  // Calculate total completed credit hours and remaining credit hours
  const totalCreditHrsCompleted = calculateTotalCreditHours(filteredCourses);
  const totalCreditHoursNeeded = calculateNeededTotalCreditHours(selectedCourseType, courses);
  const remainingCreditHrs = totalCreditHoursNeeded - totalCreditHrsCompleted;
  return [
    {
      value: totalCreditHrsCompleted,
      label: `${totalCreditHrsCompleted} Hours Completed`,
      icon: <DoneIcon />,
    },
    {
      value: remainingCreditHrs,
      label: `${remainingCreditHrs} Hours Remaining`,
      icon: <PendingIcon />,
    },
  ];
};

export default function PieChartWithCenterLabel({ selectedCourseType }) {
  const [filteredData, setFilteredData] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/study_scheme/StudyScheme11",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error("Failed to fetch data");
          setCourses([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setCourses([]);
      }
    };

    fetchData();
  }, [user.token]);

  useEffect(() => {
    const progressData = calculateProgressData(selectedCourseType, courses);
    const totalCreditHoursNeeded = calculateNeededTotalCreditHours(selectedCourseType, courses);
    const calculatedPercentage = (progressData[0].value / totalCreditHoursNeeded * 100).toFixed(1);

    setPercentage(calculatedPercentage);
    setFilteredData(progressData);
  }, [selectedCourseType, courses]);

  return (
    <div>
      {filteredData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Card sx={{ width: 280, padding: 2 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
              Progress Overview
            </Typography>
            <PieChart
              colors={palette}
              series={[{ data: filteredData, innerRadius: 70 }]}
              slotProps={{
                legend: { hidden: true },
              }}
              {...size}
            >
              <PieCenterLabel>{percentage}%</PieCenterLabel>
            </PieChart>
            <Stack direction="rows" spacing={2} justifyContent="center" alignItems="center" style={{ paddingTop: 16 }}>
              <Typography>
                {filteredData[0].label}
              </Typography>
              <Typography>
                {filteredData[1].label}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
