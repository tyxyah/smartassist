import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import CourseTypeDropdown from "../components/CourseTypeDropdown";
import { Box } from "@mui/material";
import LinearProgress from "../components/LinearProgress";
import ProgressTable from "../components/ProgressTable";

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
        <div className="progress-page">
          <p>Academic Progress:</p>
          <CourseTypeDropdown onCourseTypeChange={handleCourseTypeChange} />
        </div>
        <Box sx={{ paddingTop: 1 }}>
          <ProgressTable selectedCourseType={selectedCourseType} />
        </Box>
      </Box>
    </div>
  );
}

export default ProgressPage;
