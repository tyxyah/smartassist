import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import { Box } from "@mui/material";
//import AcademicProgressCard from "../components/DashboardAcademicProgressCard";

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <LinearProgress />
      <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 34 }}>
        <Sidebar />
      </Box>
    </div>
  );
};

export default DashboardPage;
