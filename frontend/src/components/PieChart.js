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
import { teal, red, deepPurple, grey } from "@mui/material/colors";

const size = {
  width: 300,
  height: 200,
};

const getColorPalette = (courseType) => {
  switch (courseType) {
    case 1:
      return {
        text: teal[800], // Color for Typography
        pie: [teal[500], teal[200]], // Teal colors for PieChart
      };
    case 2:
      return {
        text: red[800], // Color for Typography
        pie: [red[500], red[200]], // Red colors for PieChart
      };
    case 3:
      return {
        text: deepPurple[800], // Color for Typography
        pie: [deepPurple[500], deepPurple[200]], // Deep Purple colors for PieChart
      };
    default:
      return {
        text: grey[800], // Color for Typography
        pie: [grey[500], grey[200]], // Grey colors for PieChart
      };
  }
}

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
  const colorPalette = getColorPalette(selectedCourseType);
  const [filteredData, setFilteredData] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [typographyColor, setTypographyColor] = useState(colorPalette.text); // Add typographyColor state
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/study_scheme",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses);
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

    if (totalCreditHoursNeeded !== 0) {
      const calculatedPercentage = (
        (progressData[0].value  / totalCreditHoursNeeded) *
        100
      ).toFixed(1);
      setPercentage(calculatedPercentage);
    } else {
      setPercentage(0);
    }

    setFilteredData(progressData);
    setTypographyColor(colorPalette.text);

  }, [selectedCourseType, courses, colorPalette.text]);

  return (
    <div style={{ paddingTop: 16 }}>
      {filteredData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <Card sx={{ width: 240, padding: 2 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold" color={typographyColor} gutterBottom>
              Progress Overview
            </Typography>
            <PieChart
              colors={colorPalette.pie}
              series={[{ data: filteredData, innerRadius: 80 }]}
              slotProps={{
                legend: { hidden: true },
              }}
              {...size}
            >
              <PieCenterLabel>{percentage}%</PieCenterLabel>
            </PieChart>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" style={{ paddingTop: 16 }}>
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
