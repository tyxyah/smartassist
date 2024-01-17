import React, { useState,useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Dropdown from "../components/Dropdown";
import { Box, Stack } from "@mui/material";
import LinearProgress from "../components/LinearProgress";
import Table from "../components/Table";
import HistoryPieChart from "../components/HistoryPieChart";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useAuthContext } from "../hooks/useAuthContext";

function HistoryPage() {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);

  // || LOAD COURSES
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/study_scheme", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Log the received data to inspect its structure
          console.log("Received Data:", data.courses);
          setCourses(data.courses);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCourses();
  }, [user.token]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAllCompletedButton = () => {
    handleOpenDialog();
  };

  const handleConfirmAllCompleted = async () => {
    try {
      // Assuming 'tableRef' is the ref for the CustomizedTables component
      if (tableRef.current) {
        await tableRef.current.handleAllCoursesCompleted();
      }

      // Close the dialog after completing the logic
      handleCloseDialog();
    } catch (error) {
      console.error("Error marking all courses as completed:", error);
    }
  };

  const handleSemesterChange = (newSemester) => {
    setSelectedSemester(newSemester);
  };

  // Ref for CustomizedTables component
  const tableRef = React.createRef();

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
        <Stack direction="row" alignItems="center" spacing={33}>
          <div className="history-page">
            <p style={{ fontSize: "18px" }}>Registration History:</p>
            <Dropdown onSemesterChange={handleSemesterChange} />
          </div>
          <div>
            <Button onClick={handleAllCompletedButton}>All Completed</Button>
          </div>
        </Stack>

        <Box sx={{ paddingTop: 1 }}>
          {/* Pass the ref to the CustomizedTables component */}
          <Table ref={tableRef} selectedSemester={selectedSemester} courses={courses} setCourses={setCourses} />
        </Box>
        <Box sx={{ paddingLeft: 84 }}>
          <div
            style={{
              position: "absolute",
              top: "150px", // value to control the vertical position
              right: "16px", // value to control the horizontal position
              flex: 1,
            }}
          >
            {/* Pass the selectedSemester to HistoryPieChart */}
            <HistoryPieChart selectedSemester={selectedSemester} courses={courses} />
          </div>
        </Box>
        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm All Completed</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to mark all courses as completed?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmAllCompleted} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default HistoryPage;
