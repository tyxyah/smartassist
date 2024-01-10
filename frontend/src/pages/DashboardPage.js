import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import { Box, Stack, Grid } from "@mui/material";
import WelcomeCard from "../components/WelcomeCard";
import ElexCard, {
  LAXProgress,
  LPEProgress,
  CELProgress,
} from "../components/ElexCard";
import DashboardCard, {
  coreProgress,
  uniProgress,
  electiveProgress,
} from "../components/DashboardCard";
import TotalCreditCard from "../components/TotalCreditCard";
import RegistrationHistory from "../components/RegistrationHistory";

const DashboardPage = () => {
  return (
    // Outer container with hidden overflow to prevent scrollbars
    <Box>
      {/* Header and LinearProgress components */}
      <Header />
      <LinearProgress />

      {/* Main content grid */}
      <Grid container spacing={1} paddingLeft={34} paddingBottom={10}>
        <Grid item xs={8.5}>
          {/* Sidebar */}
          <Box>
            <Sidebar />
          </Box>

          {/* Welcome card */}
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              paddingTop: 1,
            }}
          >
            <WelcomeCard />
          </Box>

          {/* Registration History and Total Credit Card in a horizontal Stack */}
          <Stack direction="row" spacing={1.5}>
            <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
              <RegistrationHistory />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
              }}
            >
              <TotalCreditCard />
            </Box>
          </Stack>

          {/* Academic Progress cards */}
          <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
            <p style={{ fontSize: "18px" }}>Academic Progress</p>
            <Stack direction="row" spacing={2}>
              <DashboardCard title="Core Courses" data={coreProgress} />
              <DashboardCard title="Universiti Courses" data={uniProgress} />
              <DashboardCard title="Electives" data={electiveProgress} />
            </Stack>
          </Box>

          {/* ELEx Packages cards */}
          <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
            <p style={{ fontSize: "18px" }}>ELEx Packages</p>
            <Stack direction="row" spacing={2}>
              <ElexCard title="LAX" data={LAXProgress} />
              <ElexCard title="LPE" data={LPEProgress} />
              <ElexCard title="CEL" data={CELProgress} />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={2.5}></Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
