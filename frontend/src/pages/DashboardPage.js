import React, { useState, useEffect } from "react";
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
import DashboardCard from "../components/DashboardCard";
import TotalCreditCard from "../components/TotalCreditCard";
import RegistrationHistory from "../components/RegistrationHistory";
import { useAuthContext } from "../hooks/useAuthContext";

const DashboardPage = () => {
  const [progressData, setProgressData] = useState([]);
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
          console.log("Received Data:", data.credit_hours_by_type);
          setProgressData(data.credit_hours_by_type);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Box>
      <Header />
      <LinearProgress />

      <Grid container spacing={1} paddingLeft={34} paddingBottom={10}>
        <Grid item xs={8.5}>
          <Box>
            <Sidebar />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              paddingTop: 1,
            }}
          >
            <WelcomeCard />
          </Box>

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

          <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
            <p style={{ fontSize: "18px" }}>Academic Progress</p>
            <Stack direction="row" spacing={2}>
              {Object.entries(progressData)
                .filter(([key]) => key !== "NaN")
                .map(([key, courseType]) => (
                  <DashboardCard
                    key={key}
                    title={
                      key === "1"
                        ? "Universiti Courses"
                        : key === "2"
                        ? "Core Courses"
                        : key === "3"
                        ? "Electives"
                        : ""
                    }
                    courseType={courseType}
                  />
                ))}
            </Stack>
          </Box>

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
