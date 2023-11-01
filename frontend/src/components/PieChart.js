import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";

const size = {
  width: 300,
  height: 200,
};

const palette = ['#1976D2', '#A7CAED'];

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 12,
}));

function PieCenterLabel({ children }) {
  return (
    <StyledText x={size.width / 2} y={size.height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel({ selectedCourseType }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to your API
        const response = await fetch("http://localhost:4000/api/course");
        if (response.ok) {
          const data = await response.json();
          
          // Filter courses based on selectedCourseType
          const filteredCourses = data.filter(
            (course) => course.course_type === selectedCourseType
          );
          
          // Calculate total credit hours completed and remaining
          const totalCreditHrsCompleted = filteredCourses.reduce(
            (total, course) => total + parseInt(course.credit_hrs, 10),
            0
          );
          const remainingCreditHrs = 19 - totalCreditHrsCompleted;
          
          setFilteredData([
            {
              value: totalCreditHrsCompleted,
              label: `${totalCreditHrsCompleted} Hrs Completed`,
            },
            {
              value: remainingCreditHrs,
              label: `${remainingCreditHrs} Hrs Remaining`,
            },
          ]);
        } else {
          console.error("Failed to fetch data");
          setFilteredData([]); // Clear the data on error
        }
      } catch (error) {
        console.error("Error:", error);
        setFilteredData([]); // Clear the data on error
      }
    };

    fetchData();
  }, [selectedCourseType]);

  return (
    <div style={{ width: "100%" }}>
      {filteredData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <PieChart
          colors={palette}
          series={[{ data: filteredData, innerRadius: 70 }]}
          slotProps={{
            legend: { hidden: true },
          }}
          {...size}
        >
          <PieCenterLabel>
            <tspan x={size.width / 2} dy="-0.8em">
              {filteredData[0].label}
            </tspan>
            <tspan x={size.width / 2} dy="1.6em">
              {filteredData[1].label}
            </tspan>
          </PieCenterLabel>
        </PieChart>
      )}
    </div>
  );
}
