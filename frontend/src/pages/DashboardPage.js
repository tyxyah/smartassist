import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import { Box } from "@mui/material";

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <LinearProgress />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
      </Box>
      <h2>Dashboard Page</h2>
      <p>This is the profile page content.</p>
    </div>
  );
};

export default DashboardPage;
