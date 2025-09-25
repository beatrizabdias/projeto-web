import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

function DesktopNav() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          backgroundColor: '#1d1d1d',
          color: 'white',
          borderRight: '1px solid #383838'
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" noWrap>
          Seu Logo
        </Typography>
      </Box>
      <List>
        <ListItem disablePadding component={Link} to="/fila">
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white' }}>
              <QueueMusicIcon />
            </ListItemIcon>
            <ListItemText primary="Fila" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to="/playlists">
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white' }}>
              <PlaylistPlayIcon />
            </ListItemIcon>
            <ListItemText primary="Playlists" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to="/grupos">
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white' }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Grupos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to="/perfil">
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white' }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default DesktopNav;