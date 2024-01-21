import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useAuthContext } from "../hooks/useAuthContext";

const xLabels = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
];

const highlightScope = {
  highlighted: "item",
  faded: "global",
};

export default function MixedBarChart() {
  const [universityData, setUniversityData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [coreData, setCoreData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [electiveData, setElectiveData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [data, setData] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/dashboard/credit-hours-by-type",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Received Data:", data);
          // Set the credit data directly, without modifying it further
          setData(data.credit_hours_by_type_and_semester);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    // Update completedData, coreData, and electiveData when credit data changes
    if (data && Object.keys(data).length > 0) {
      const newUniversityData = xLabels.map((label, index) => {
        const semesterData = data[index + 1]; // API uses 1-based index
        return semesterData ? semesterData["1"]?.completed || 0 : 0;
      });
      setUniversityData(newUniversityData);
  
      const newCoreData = xLabels.map((label, index) => {
        const semesterData = data[index + 1]; // API uses 1-based index
        return semesterData ? semesterData["2"]?.completed || 0 : 0;
      });
      setCoreData(newCoreData);
  
      const newElectiveData = xLabels.map((label, index) => {
        const semesterData = data[index + 1]; // API uses 1-based index
        return semesterData ? semesterData["3"]?.completed || 0 : 0;
      });
      setElectiveData(newElectiveData);
    }
  }, [data]);  

  return (
    <Card
      style={{
        borderRadius: 10,
        boxShadow: "0 2px 4px rgba(0.1, 0.1, 0.1, 0.1)", // Subtle shadow
      }}
    >
      <CardContent>
        <Typography
          variant="body"
          style={{ fontFamily: "Arial", fontWeight: "bold" }}
        >
          Academic History
        </Typography>
        <BarChart
          title="Academic Progress Bar"
          width={750}
          height={400}
          tooltip={{ trigger: "item" }}
          series={[
            {
              data: universityData,
              label: "Completed University",
              stack: "stack1",
              barBorderRadius: [5, 5, 0, 0],
            },
            {
              data: coreData,
              label: "Completed Core",
              stack: "stack1",
              barBorderRadius: [5, 5, 0, 0],
            },
            {
              data: electiveData,
              label: "Completed Elective",
              stack: "stack1",
              barBorderRadius: [5, 5, 0, 0],
            },
          ].map((s) => ({ ...s, highlightScope }))}
          xAxis={[{ data: xLabels, scaleType: "band", categoryGapRatio: 0.6,
          barGapRatio: 0.8}]}
          slotProps={{
            legend: { hidden: true },
          }}
        />
      </CardContent>
    </Card>
  );
}
