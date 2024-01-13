import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import CourseTypeDropdown from "../components/CourseTypeDropdown";
import { Box } from "@mui/material";
import LinearProgress from "../components/LinearProgress";
import ProgressTable from "../components/ProgressTable";
import PieChart from "../components/PieChart";
import TotalKokurikulum from "../components/TotalKokurikulum";
import ElexCard from "../components/ElexCard";
import Stack from "@mui/material/Stack";
import { useAuthContext } from "../hooks/useAuthContext";

function ProgressPage() {
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
  }, [user, setProgressData]);
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
          <p style={{ fontSize: "18px" }}>Academic Progress:</p>
          <CourseTypeDropdown onCourseTypeChange={handleCourseTypeChange} />
        </div>
        <Box sx={{ display: "flex", paddingTop: 2 }}>
          <div style={{ flex: 1 }}>
            <ProgressTable selectedCourseType={selectedCourseType} progressData={progressData} />
          </div>
          {selectedCourseType === 4 ? (
            <div
              style={{
                position: "absolute",
                top: "142px",
                right: "16px",
                flex: 1,
              }}
            >
              <Stack direction="column" spacing={2}>
              <TotalKokurikulum showAlert={false} />
              <p style={{ fontSize: "18px" }}>ELEx Packages</p>
              <ElexCard title="LAX" data={elexPackageProgress.LAX} />
              <ElexCard title="CEL" data={elexPackageProgress.CEL} />
              </Stack>
            </div>
          ) : (
            selectedCourseType !== 4 && (
              <div
                style={{
                  position: "absolute",
                  top: "142px",
                  right: "16px",
                  flex: 1,
                }}
              >
                <PieChart selectedCourseType={selectedCourseType} />
              </div>
            )
          )}
        </Box>
      </Box>
    </div>
  );
}

export default ProgressPage;
