import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import PlaylistCard from '../../components/playlists/PlaylistCard';
import AddPlaylist from '../../components/playlists/AddPlaylist';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Simulação de dados
    const fetchedPlaylists = [
      { id: 1, nome: 'Playlist de Rock Clássico', imagem: 'https://images.unsplash.com/photo-1510915361306-253c89837943?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 2, nome: 'Músicas de Verão', imagem: 'https://images.unsplash.com/photo-1549646535-613d7589d38c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 3, nome: 'Estudos e Foco', imagem: 'https://images.unsplash.com/photo-1498050108023-c5249f4cd085?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 4, nome: 'Pop dos Anos 90', imagem: 'https://images.unsplash.com/photo-1526435987114-1188151acdd5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 5, nome: 'Relax e Meditação', imagem: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];
    setPlaylists(fetchedPlaylists);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Suas Playlists
        </Typography>
      </Box>

      <Grid container spacing={4}> {/* Removido o justifyContent="center" */}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <AddPlaylist />
        </Grid>
        
        {playlists.map((playlist) => (
          <Grid key={playlist.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <PlaylistCard playlist={playlist} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Playlists;