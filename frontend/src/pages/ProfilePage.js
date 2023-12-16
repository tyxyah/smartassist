import React from "react";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import LinearProgress from "../components/LinearProgress";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailIcon from "@mui/icons-material/Email";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

function ProfilePage() {
  // Dummy data (replace with your actual data)
  const userProfile = {
    username: "john_doe",
    matric_number: "123122",
    email: "john.doe@example.com",
    password: "*********",
    studentType: "Undergraduate",
    startSession: "2022",
    muet: "Band 6",
    currentSemester: "3",
    academicAdvisor: "Dr. Smith",
  };

  const items = [
    { text: "Email", icon: <EmailIcon />, content: userProfile.email },
    {
      text: "Advisor",
      icon: <TipsAndUpdatesIcon />,
      content: userProfile.academicAdvisor,
    },
  ];

  return (
    <div>
      <Header />
      <LinearProgress />
      <Box sx={{ display: "flex", alignItems: "center", paddingLeft: 34 }}>
        <Sidebar />
        <Stack direction="row" spacing={3}>
          <Paper elevation={3} sx={{ width: 350 }}>
            <Stack direction="row" spacing={2} padding={2}>
              <Avatar alt="User Avatar" src="../assets/default-profile.png" />
              <Stack direction="column">
                <Typography variant="body1" component="div">
                  <strong>{userProfile.username}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {userProfile.matric_number}
                </Typography>
              </Stack>
            </Stack>
            <Divider light />
            <Stack spacing={2} padding={2}>
              <Typography variant="body2">
                <List>
                  {items.map((item) => (
                    <ListItem key={item.text} disablePadding>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText>{item.text}</ListItemText>
                      <ListItemText sx={{ textAlign: "right" }}>
                        {item.content}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Typography>
            </Stack>
          </Paper>
          <Paper elevation={3} sx={{ width: 635 }}>
            <Stack direction="row" spacing={2} padding={2}>
              <Typography variant="body1" fontWeight="bold">
                About Me
              </Typography>
            </Stack>
            <Divider light />
            <Stack sx={{ padding: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Student Type: {userProfile.studentType}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Start Session: {userProfile.startSession}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                MUET: {userProfile.muet}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Current Semester: {userProfile.currentSemester}
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </div>
  );
}

export default ProfilePage;
