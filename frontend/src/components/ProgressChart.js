import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { grey } from "@mui/material/colors";
import { useAuthContext } from "../hooks/useAuthContext";

const yLabels = [
  "Sem 1",
  "Sem 2",
  "Sem 3",
  "Sem 4",
  "Sem 5",
  "Sem 6",
  "Sem 7",
  "Sem 8",
];

const highlightScope = {
  highlighted: "item",
  faded: "global",
};

export default function MixedBarChart() {
  const [userDetails, setUserDetails] = useState({});

  const [universityData, setUniversityData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [coreData, setCoreData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [electiveData, setElectiveData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [semesterTypeData, setSemesterTypeData] = useState([]);

  const { user } = useAuthContext();

  const requiredData12 = [17, 15, 16, 18, 18, 17, 13, 12];
  const requiredData34 = [14, 18, 16, 15, 18, 17, 13, 12];
  const requiredData56 = [14, 15, 16, 18, 18, 17, 13, 12];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/student", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Received Data:", data);
          setUserDetails(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();

    const fetchCredit = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/dashboard/credit-hours-by-semester",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Received Data:", data);
          // Set the credit data 
          //setCredit(data.credit_hours_by_semester);
          setSemesterTypeData(data.credit_hours_by_type_and_semester);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCredit();
  }, [user]);

  //useEffect(() => {
    // Update completedData when credit data changes
    //if (credit && Object.keys(credit).length > 0) {
      //const newCompletedData = yLabels.map((label, index) => {
        //const semesterData = credit[index + 1]; // API uses 1-based index
        //return semesterData ? semesterData.completed : 0;
      //});
      //setCompletedData(newCompletedData);
    //}
  //}, [credit]);

  useEffect(() => {
    // Update completedData, coreData, and electiveData when credit data changes
    if (semesterTypeData && Object.keys(semesterTypeData).length > 0) {
      const newUniversityData = yLabels.map((label, index) => {
        const semesterData = semesterTypeData[index + 1]; // API uses 1-based index
        return semesterData ? semesterData["1"]?.completed || 0 : 0;
      });
      setUniversityData(newUniversityData);
  
      const newCoreData = yLabels.map((label, index) => {
        const semesterData = semesterTypeData[index + 1]; // API uses 1-based index
        return semesterData ? semesterData["2"]?.completed || 0 : 0;
      });
      setCoreData(newCoreData);
  
      const newElectiveData = yLabels.map((label, index) => {
        const semesterData = semesterTypeData[index + 1]; // API uses 1-based index
        return semesterData ? semesterData["3"]?.completed || 0 : 0;
      });
      setElectiveData(newElectiveData);
    }
  }, [semesterTypeData]);

  // Conditionally set the data based on userDetails.muet
  let data;
  if (userDetails.muet === "1") {
    data = requiredData12;
  } else if (userDetails.muet === "2") {
    data = requiredData34;
  } else if (userDetails.muet === "3") {
    data = requiredData56;
  } else {
    // Default to requiredData12 or handle other cases as needed
    data = requiredData12;
  }

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
          Academic Progress
        </Typography>
        <BarChart
          title="Academic Progress Bar"
          width={750}
          height={400}
          tooltip={{ trigger: "axis" }}
          series={[
            {
              data,
              label: "Credit Required",
              barBorderRadius: [5, 5, 0, 0],
              color: grey[300],
            },
            //{
              //data: completedData,
              //label: "Completed",
              //barBorderRadius: [5, 5, 0, 0],
            //},
            {
              data: universityData,
              label: "Completed University",
              stack: "stack1",
              barBorderRadius: [5, 5, 0, 0],
              color: "#a7caed",
            },
            {
              data: coreData,
              label: "Completed Core",
              stack: "stack1",
              barBorderRadius: [5, 5, 0, 0],
              color: "#0b0669",
            },
            {
              data: electiveData,
              label: "Completed Elective",
              stack: "stack1",
              barBorderRadius: [5, 5, 0, 0],
              color: "#1976d2",
            },
          ].map((s) => ({ ...s, highlightScope }))}
          yAxis={[{ data: yLabels, scaleType: "band", barGapRatio: 0 }]}
          slotProps={{
            legend: { hidden: true },
          }}
          layout="horizontal"
        />
      </CardContent>
    </Card>
  );
}
