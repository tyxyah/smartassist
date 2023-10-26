import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ProfilePicture from './ProfilePicture';

export default function PermanentDrawerLeft() {
  const items = [
    { text: 'Profile', icon: <PermIdentityOutlinedIcon /> },
    { text: 'Dashboard', icon: <DashboardCustomizeOutlinedIcon /> },
    { text: 'Academic Progress', icon: <ShowChartOutlinedIcon /> },
    { text: 'Course Plan', icon: <EditCalendarOutlinedIcon /> },
    { text: 'History', icon: <HistoryOutlinedIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        className="custom-drawer" 
        variant="permanent"
        anchor="left"
      >
        <p className="welcomeText"> 
          <strong>Welcome Back!</strong>
        </p>

        <ProfilePicture />
        <Box sx={{ flexGrow: 1 }}>
          <List>
            {items.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton className="list-item">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton className="list-item">
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      
    </Box>
  );
}
