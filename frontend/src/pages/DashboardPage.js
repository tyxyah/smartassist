import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import { Box, Stack, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ElexCard from "../components/ElexCard";
import TotalCreditCard from "../components/TotalCreditCard";
import TotalKokurikulum from "../components/TotalKokurikulum";
import { useAuthContext } from "../hooks/useAuthContext";
import ProgressChart from "../components/ProgressChart";
import WelcomeCard from "../components/WelcomeCard"
import DashboardCard from "../components/DashboardCard";

const DashboardPage = () => {
  const [progressData, setProgressData] = useState([]);
  const [elexPackageProgress, setElexPackageProgress] = useState({
    LAX: {},
    LPE: {},
    CEL: {},
  });
  const [completedElex, setCompletedElex] = useState({LAX: {},
    LPE: {},
    CEL: {},});
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
          setElexPackageProgress(
            dataElexPackage.elex_package_progress_until_current_semester
          );
          setCompletedElex(dataElexPackage.elex_package_progress);
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
      <Grid
        container
        spacing={1}
        paddingLeft={34}
        paddingBottom={5}
        paddingRight={3}
      >
        <Grid item xs={9}>
          <Box>
            <Sidebar />
          </Box>
          <Box
            sx={{ flexGrow: 1, bgcolor: "background.default", paddingTop: 1 }}
          >
            <WelcomeCard />
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
              }}
            >
              <ProgressChart />
            </Box>
             <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              paddingRight={5}
              marginTop={1}
            >
              <p
              style={{ fontFamily: "Arial", fontWeight: "bold", marginLeft: 5 }}
            >
              Courses Completed
            </p>
              <Link to="/AcademicProgress">See All</Link>
            </Stack>
            <Stack direction="row" spacing={2}>
              {Object.entries(progressData)
                .filter(([key]) => key !== "NaN" && parseInt(key) <= 3)
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
        </Grid>
        <Grid item xs={3}>
          <Stack direction="column" spacing={2} marginLeft={2} paddingTop={1}>
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
              }}
            >
              <TotalKokurikulum />
            </Box>

            <p
              style={{ fontFamily: "Arial", fontWeight: "bold", marginLeft: 5 }}
            >
              ELEx Completed
            </p>
            <ElexCard title="LAX (Point)" data={elexPackageProgress.LAX} completedData={completedElex.LAX}/>
            <ElexCard title="CEL (Subject)" data={elexPackageProgress.CEL} completedData={completedElex.CEL}/>
            <ElexCard title="LPE (Subject)" data={elexPackageProgress.LPE} completedData={completedElex.LPE}/>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
