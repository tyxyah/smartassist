import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";
import { useDrawingArea } from "@mui/x-charts/hooks";

const size = {
  width: 300,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
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

export default function PieChartWithCenterLabel({ selectedCourseType }) {
  const [filteredData, setFilteredData] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/course");
        if (response.ok) {
          const data = await response.json();

          const filteredCourses = data.filter(
            (course) => course.course_type === selectedCourseType
          );

          const totalCreditHrsCompleted = filteredCourses.reduce(
            (total, course) => total + parseInt(course.credit_hrs, 10),
            0
          );
          const remainingCreditHrs = 19 - totalCreditHrsCompleted;
          const calculatedPercentage = Math.round(
            (totalCreditHrsCompleted / 19) * 100
          );

          setPercentage(calculatedPercentage);

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
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setFilteredData([]);
      }
    };

    fetchData();
  }, [selectedCourseType]);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      {filteredData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <PieChart
            colors={palette}
            series={[{ data: filteredData, innerRadius: 70 }]}
            slotProps={{
              legend: { hidden: true },
            }}
            {...size}
          >
            <PieCenterLabel>
              {percentage}%
            </PieCenterLabel>
          </PieChart>
          <div style={{ textAlign: "center", paddingRight: 90 }}>
            <p>{filteredData[0].label}</p>
            <p>{filteredData[1].label}</p>
          </div>
        </div>
      )}
    </div>
  );
}
