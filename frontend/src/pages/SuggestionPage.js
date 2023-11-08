import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import { Box } from "@mui/material";
import SuggestedCourse from "../components/SuggestedCourse";
import CoursePlan from "../components/CoursePlan"

function SuggestionPage() {
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
        <div className="suggestion-page">
          <h3>Suggested Course</h3>
          <SuggestedCourse />
        </div>
        <div>
          <h3>Course Plan</h3>
          <CoursePlan />
        </div>
      </Box>
    </div>
  );
}

export default SuggestionPage;
