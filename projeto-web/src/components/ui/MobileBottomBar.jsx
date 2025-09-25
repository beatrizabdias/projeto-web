import React, { useState } from 'react';
import { Box, Typography, IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MobileNav from './MobileNav';

function MobileBottomBar() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box
      sx={{
        display: { sm: 'flex', md: 'none' },
        flexDirection: 'column',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#1d1d1d',
        zIndex: 1100, // Garante que a barra fique acima do resto
      }}
    >
      {/* Container do player mobile */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderTop: '1px solid #383838',
        }}
      >
        <Box sx={{ flexGrow: 1, mr: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 'bold' }}>
            Música muito legal
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Artista legal
          </Typography>
          <Slider
            size="small"
            defaultValue={30}
            color="secondary"
            sx={{ mt: 1, p: 0 }}
          />
        </Box>
        <IconButton onClick={handlePlayPause} sx={{ color: '#ff6b00', fontSize: '1rem' }}>
          {isPlaying ? <PauseIcon sx={{ fontSize: 32 }} /> : <PlayArrowIcon sx={{ fontSize: 32 }} />}
        </IconButton>
      </Box>
      
      {/* Componente de navegação mobile */}
      <MobileNav />
    </Box>
  );
}

export default MobileBottomBar;