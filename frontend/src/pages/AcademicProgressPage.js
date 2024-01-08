import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import CourseTypeDropdown from "../components/CourseTypeDropdown";
import { Box } from "@mui/material";
import LinearProgress from "../components/LinearProgress";
import ProgressTable from "../components/ProgressTable";
import PieChart from "../components/PieChart";

function ProgressPage() {
  const [selectedCourseType, setSelectedCourseType] = useState(1);
  const handleCourseTypeChange = (newCourseType) => {
    setSelectedCourseType(newCourseType);
  };

  return (
    <div>
      <Header />
      <LinearProgress />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", paddingLeft: 34 }}
      >
        <div className="progress-page" >
          <p style={{ fontSize: '18px' }}>Academic Progress:</p>
          <CourseTypeDropdown onCourseTypeChange={handleCourseTypeChange} />
        </div>
        <Box sx={{ display: "flex", paddingTop: 2}}>
          <div style={{ flex: 1 }}>
            <ProgressTable selectedCourseType={selectedCourseType} />
          </div>
          <div
            style={{
              position: "absolute",
              top: "142px", // value to control the vertical position
              right: "16px", // value to control the horizontal position
              flex: 1,
            }}
          >
            <PieChart selectedCourseType={selectedCourseType} />
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default ProgressPage;
