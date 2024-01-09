// Import necessary components and modules
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import { Box, Stack } from "@mui/material";
import WelcomeCard from "../components/WelcomeCard";
import DashboardCard, { mathProgress, scienceProgress, computerProgress } from "../components/DashboardCard";

const DashboardPage = () => {
  return (
    <Box>
      {/* Header and LinearProgress components */}
      <Header />
      <LinearProgress />

      <Box>
        <Sidebar />
      </Box>

      {/* WelcomeCard component */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          paddingLeft: 34,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <WelcomeCard/>
      </Box>
      <Box
        sx={{ flexGrow: 1, bgcolor: "background.default", paddingLeft: 34 }}>
          <p style={{ fontSize: '18px' }} >Academic Progress</p>
      {/* DashboardCard components for different course types using Stack */}
      <Stack direction="row" spacing={2}>
        <DashboardCard title="Math Progress" data={mathProgress} />
        <DashboardCard title="Science Progress" data={scienceProgress} />
        <DashboardCard title="Computer Progress" data={computerProgress} />
        {/* Add more DashboardCard components for other course types */}
      </Stack>
      </Box>
    </Box>
  );
};

export default DashboardPage;
