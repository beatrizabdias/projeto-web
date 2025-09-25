import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function AddPlaylist() {
  return (
    <Card sx={{ 
      width: '100%', // Garante que o card preencha o Grid item
      backgroundColor: 'background.paper',
      boxShadow: '0 4px 12px var(--shadow-color-dark)',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05) translateY(-5px)',
        boxShadow: '0 8px 20px var(--shadow-color-light)',
      }
    }}>
      <CardActionArea sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box
          sx={{
            width: '100%',
            height: 140,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'action.hover',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
        </Box>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
            Nova Playlist
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default AddPlaylist;