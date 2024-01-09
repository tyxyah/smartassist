import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import { Box } from "@mui/material";
import WelcomecCard from "../components/WelcomeCard";

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <LinearProgress />
      <Box>
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", paddingLeft: 34, paddingTop: 2 }}
      >
        <WelcomecCard />
      </Box>
    </div>
  );
};

export default DashboardPage;
