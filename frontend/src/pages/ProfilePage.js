import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import { Box } from "@mui/material";

const ProfilePage = () => {
  return (
    <div>
      <Header />
      <LinearProgress />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
      </Box>
      <h2>Profile Page</h2>
      <p>This is the profile page content.</p>
    </div>
  );
};

export default ProfilePage;
