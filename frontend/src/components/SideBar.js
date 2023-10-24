import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ProfilePicture from './ProfilePicture';

const drawerWidth = 245;

export default function PermanentDrawerLeft() {
  const items = [
    { text: 'Profile', icon: <AccountCircleOutlinedIcon /> },
    { text: 'Dashboard', icon: <DashboardCustomizeOutlinedIcon /> },
    { text: 'Academic Progress', icon: <ShowChartOutlinedIcon /> },
    { text: 'Course Plan', icon: <CalendarTodayOutlinedIcon /> },
    { text: 'History', icon: <HistoryOutlinedIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <p style={{ fontSize: "20px", textAlign:"center"}}>
          <strong>Welcome Back!</strong>
        </p>

        <ProfilePicture />
        <Box sx={{ flexGrow: 1 }}>
        <List>
          {items.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
      </Box>
    </Box>
  );
}
