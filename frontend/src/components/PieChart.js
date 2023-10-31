import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";

const size = {
  width: 300,
  height: 200,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 12,
}));

function PieCenterLabel({ children }) {
  return <StyledText x={size.width / 2} y={size.height / 2}>{children}</StyledText>;
}

export default function PieChartWithCenterLabel({ selectedCourseType }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/course?type=${selectedCourseType}`);
        if (response.ok) {
          const data = await response.json();

          const totalCreditHrsCompleted = data.reduce(
            (total, course) => total + parseInt(course.credit_hrs, 10),
            0
          );

          const remainingCreditHrs = 19 - totalCreditHrsCompleted;

          setFilteredData([
            { value: totalCreditHrsCompleted, label: `${totalCreditHrsCompleted} Hrs Completed` },
            { value: remainingCreditHrs, label: `${remainingCreditHrs} Hrs Remaining` },
          ]);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [selectedCourseType]);

  if (filteredData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <PieChart
        series={[{ data: filteredData, innerRadius: 70 }]}
        slotProps={{
          legend: { hidden: true },
        }}
        {...size}
      >
        <PieCenterLabel>
          <tspan x={size.width / 2} dy="-0.8em">{filteredData[0].label}</tspan>
          <tspan x={size.width / 2} dy="1.6em">{filteredData[1].label}</tspan>
        </PieCenterLabel>
      </PieChart>
    </div>
  );
}
