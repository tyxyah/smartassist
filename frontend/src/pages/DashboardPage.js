import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import { Box, Stack, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import WelcomeCard from "../components/WelcomeCard";
import ElexCard from "../components/ElexCard";
import DashboardCard from "../components/DashboardCard";
import TotalCreditCard from "../components/TotalCreditCard";
import TotalELEx from "../components/TotalELEx";
import TotalKokurikulum from "../components/TotalKokurikulum";
import RegistrationHistory from "../components/RegistrationHistory";
import { useAuthContext } from "../hooks/useAuthContext";

const DashboardPage = () => {
  const [progressData, setProgressData] = useState([]);
  const [elexPackageProgress, setElexPackageProgress] = useState({
    LAX: {},
    LPE: {},
    CEL: {},
  });
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch credit hours data
        const responseCreditHours = await fetch(
          "http://localhost:4000/api/dashboard/credit-hours-by-type",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (responseCreditHours.ok) {
          const dataCreditHours = await responseCreditHours.json();
          console.log("Received Data:", dataCreditHours.credit_hours_by_type);
          setProgressData(dataCreditHours.credit_hours_by_type);
        } else {
          console.error("Failed to fetch credit hours data");
        }

        // Fetch ELEx package progress data
        const responseElexPackage = await fetch(
          "http://localhost:4000/api/dashboard/elex-package-progress",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (responseElexPackage.ok) {
          const dataElexPackage = await responseElexPackage.json();
          console.log("Received ELEx Package Data:", dataElexPackage);
          setElexPackageProgress(dataElexPackage.elex_package_progress);
        } else {
          console.error("Failed to fetch ELEx package progress data");
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
        <Grid item xs={8.8}>
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

          <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
          <Stack direction={"row"}>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
              }}
            >
              <TotalCreditCard />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                paddingLeft: 1,
              }}
            >
              <TotalELEx />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                paddingLeft: 1,
              }}
            >
              <TotalKokurikulum />
            </Box>
          </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              paddingRight={5}
            >
              <p style={{ fontSize: "18px" }}>Academic Progress</p>
              <Link to="/AcademicProgress">See All</Link>
            </Stack>
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
            
              <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
                <RegistrationHistory />
              </Box>
          </Box>
        </Grid>
        <Grid item xs={2.2}> <p style={{ fontSize: "18px" }}>ELEx Packages</p>
            <Stack direction="column" spacing={2}>
              <ElexCard title="LAX" data={elexPackageProgress.LAX} />
              <ElexCard title="LPE" data={elexPackageProgress.LPE} />
              <ElexCard title="CEL" data={elexPackageProgress.CEL} />
            </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
