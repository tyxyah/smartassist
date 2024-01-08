import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ProfilePicture from './ProfilePicture';
import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

export default function PermanentDrawerLeft() {
  const items = [
    { text: 'Dashboard', icon: <DashboardCustomizeOutlinedIcon />, link: 'Dashboard' },
    { text: 'Course Plan', icon: <EditCalendarOutlinedIcon />, link: 'Suggestion' },
    { text: 'Academic Progress', icon: <ShowChartOutlinedIcon />, link: 'AcademicProgress' },
    { text: 'History', icon: <HistoryOutlinedIcon />, link: 'History' },
  ];

  const logoutItem = { text: 'Logout', icon: <LogoutOutlinedIcon />, link: '' }

  const { logout } = useLogout();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = React.useState(location.pathname);

  React.useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location.pathname]);

  const handleClick = () => {
    logout();
  };

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
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <List>
            {items.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  className={`list-item ${selectedItem === `/${item.link}` ? 'selected' : ''}`}
                  component={Link}
                  to={`/${item.link}`}
                  onClick={() => setSelectedItem(`/${item.link}`)}
                  sx={{ margin: '3px 0' }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              className={`list-item ${selectedItem === `/${logoutItem.link}` ? 'selected' : ''}`}
              onClick={handleClick}
              component={Link}
              to={`/${logoutItem.link}`}
              sx={{ margin: '8px 0' }}
            >
              <ListItemIcon>
                {logoutItem.icon}
              </ListItemIcon>
              <ListItemText primary={logoutItem.text} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
