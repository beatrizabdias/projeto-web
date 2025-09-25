import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function MobileNav() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      sx={{
        width: '100%',
        backgroundColor: '#1d1d1d',
      }}
    >
      <BottomNavigationAction
        label="Fila"
        value="/fila"
        icon={<QueueMusicIcon />}
        component={Link}
        to="/fila"
      />
      <BottomNavigationAction
        label="Playlists"
        value="/playlists"
        icon={<PlaylistPlayIcon />}
        component={Link}
        to="/playlists"
      />
      <BottomNavigationAction
        label="Grupos"
        value="/grupos"
        icon={<GroupsIcon />}
        component={Link}
        to="/grupos"
      />
      <BottomNavigationAction
        label="Perfil"
        value="/perfil"
        icon={<AccountCircleIcon />}
        component={Link}
        to="/perfil"
      />
    </BottomNavigation>
  );
}

export default MobileNav;