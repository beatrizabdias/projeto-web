import React from 'react';
import { Box, IconButton } from '@mui/material';
import QueueMusicIcon from '@mui/icons-material/QueueMusic'; // Icone para Fila
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'; // Icone para Playlists
import GroupIcon from '@mui/icons-material/Group'; // Icone para Grupos
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icone para Perfil
import NavBar from './NavBar';
import '../pages/playlists/Playlists.css';
import '../index.css';

import SideBar from './SideBar'; // Importe o novo SideBar

function Header() {
  return (
    <header>
      <NavBar />

      {/* SideBar para Desktop: Fixo na lateral, escondido no mobile */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '80px',
          zIndex: 999,
          // Esconde no celular, visível no tablet/desktop (conforme sua media query de 768px)
          display: { xs: 'none', md: 'flex' } 
        }}
      >
        <SideBar isMobile={false} />
      </Box>
    </header>
  );
}

export default Header;