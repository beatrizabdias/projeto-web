// src/components/Player.jsx

import React from 'react';
import { Box, IconButton, Typography, Slider } from '@mui/material';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import MobileNav from './MobileNav'; // Importe o MobileNav aqui

function Player() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: 2, 
        backgroundColor: '#1d1d1d',
        color: '#fff',
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }}
    >
      {/* Player de música para desktop, oculto em telas xs */}
      <Box sx={{ width: '90%', display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
        <Slider 
          aria-label="Progresso da música" 
          defaultValue={30}
          color="secondary"
          sx={{
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
              '&:before': { boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)' },
            },
            '& .MuiSlider-track': { border: 'none' },
            '& .MuiSlider-rail': { color: '#383838' },
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
          <IconButton aria-label="Voltar" sx={{ color: '#fff' }}>
            <FastRewindIcon />
          </IconButton>
          <IconButton aria-label={isPlaying ? "Pausar" : "Tocar"} sx={{ color: '#fff' }} onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon sx={{ fontSize: 40 }} /> : <PlayArrowIcon sx={{ fontSize: 40 }} />}
          </IconButton>
          <IconButton aria-label="Avançar" sx={{ color: '#fff' }}>
            <FastForwardIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
          Música muito legal - Artista legal
        </Typography>
      </Box>

      {/* Navegação móvel, visível apenas em telas xs */}
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, width: '100%' }}>
        <MobileNav />
      </Box>
    </Box>
  );
}

export default Player;