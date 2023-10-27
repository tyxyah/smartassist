import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Dropdown from "../components/Dropdown";
import { Box } from "@mui/material";
import LinearProgress from "../components/LinearProgress";
import Table from "../components/Table";

function HistoryPage() {
  const [selectedSemester, setSelectedSemester] = useState(1);

  const handleSemesterChange = (newSemester) => {
    setSelectedSemester(newSemester);
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
        <div className="history-page">
          <p>Registration History:</p>
          <Dropdown onSemesterChange={handleSemesterChange} />
        </div>
        <Box sx={{ paddingTop: 1 }}>
          <Table selectedSemester={selectedSemester} />
        </Box>
      </Box>
    </div>
  );
}

export default HistoryPage;
