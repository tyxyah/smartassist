import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";
import DoneIcon from "@mui/icons-material/Done";
import { useDrawingArea } from "@mui/x-charts/hooks";
import PendingIcon from "@mui/icons-material/Pending";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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

const calculateTotalCreditHours = (courses) => {
  return courses.reduce(
    (total, course) => total + (parseFloat(course.credit_hours) || 0),
    0
  );
};

const calculateNeededTotalCreditHours = (selectedSemester, courses) => {
  const filteredCourses = courses.filter(
    (course) => course.semester_id === selectedSemester
  );
  return filteredCourses.reduce(
    (total, course) => total + (parseFloat(course.credit_hours) || 0),
    0
  );
};

const calculateProgressData = (selectedSemester, courses) => {
  const filteredCourses = courses.filter(
    (course) => course.semester_id === selectedSemester
  );

  const completedCourses = filteredCourses.filter((course) => course.status);
  const completedCreditHours = calculateTotalCreditHours(completedCourses);
  const totalCreditHoursNeeded = calculateNeededTotalCreditHours(
    selectedSemester,
    courses
  );
  const remainingCreditHrs = totalCreditHoursNeeded - completedCreditHours;

  return [
    {
      value: completedCreditHours,
      label: `${completedCreditHours} Hours Completed`,
      icon: <DoneIcon />,
    },
    {
      value: remainingCreditHrs,
      label: `${remainingCreditHrs} Hours Remaining`,
      icon: <PendingIcon />,
    },
  ];
};

/* const fetchData = async (userToken, setCourses) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/study_scheme",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setCourses(data.courses);
      console.log("DataCOurses",data.courses)
    } else {
      console.error("Failed to fetch data");
      setCourses([]);
    }
  } catch (error) {
    console.error("Error:", error);
    setCourses([]);
  }
};*/

const PieChartWithCenterLabel = ({ selectedSemester, courses }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [percentage, setPercentage] = useState(0);
  
  // const { user } = useAuthContext();
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   console.log("isChanged",isChanged)
  //   fetchData(user.token, setCourses);
  // }, [selectedSemester, user.token,isChanged]);

  useEffect(() => {
    const progressData = calculateProgressData(selectedSemester, courses);
    const totalCreditHoursNeeded = calculateNeededTotalCreditHours(
      selectedSemester,
      courses
    );
    const completedCreditHours =
      progressData.length > 0 ? progressData[0].value : 0;

    if (totalCreditHoursNeeded !== 0) {
      const calculatedPercentage = (
        (completedCreditHours / totalCreditHoursNeeded) *
        100
      ).toFixed(1);
      setPercentage(calculatedPercentage);
    } else {
      setPercentage(0);
    }

    setFilteredData(progressData);
  }, [selectedSemester, courses]);

  return (
    <div>
      {filteredData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Card sx={{ width: 240, padding: 2, marginBottom: 2 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary"
                gutterBottom
              >
                Progress Overview
              </Typography>
              <PieChart
                colors={palette}
                series={[{ data: filteredData, innerRadius: 80 }]}
                slotProps={{
                  legend: { hidden: true },
                }}
                width={300}
                height={200}
              >
                <PieCenterLabel>{percentage}%</PieCenterLabel>
              </PieChart>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{ paddingTop: 16 }}
              >
                <Typography>{filteredData[0].label}</Typography>
                <Typography>{filteredData[1].label}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PieChartWithCenterLabel;
