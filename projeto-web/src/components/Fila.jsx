// Fila.jsx

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useMusicPlayer } from '../context/MusicPlayerContext';

function Fila() {
    // Importamos a fila, o índice da música atual na fila e o objeto da música atual
    const { queue, queueIndex, currentSong } = useMusicPlayer();

    return (
        <main className="content-area queue-page">
            <Typography variant="h4" component="h1" sx={{ color: 'var(--text-color)', fontWeight: 'bold', marginBottom: '20px' }}>
                Fila de Reprodução
            </Typography>
            
            <Box sx={{ maxWidth: '800px', backgroundColor: 'var(--card-bg)', borderRadius: '12px', padding: '10px 0' }}>
                <List>
                    {queue.length === 0 ? (
                        <Typography sx={{ color: 'var(--secondary-text-color)', padding: '20px' }}>
                            A fila está vazia. Comece a tocar uma playlist para adicionar músicas aqui.
                        </Typography>
                    ) : (
                        queue.map((song, index) => {
                            // Verifica se esta música é a que está tocando agora
                            const isCurrentlyPlaying = currentSong && song.id === currentSong.id;
                            
                            return (
                                <React.Fragment key={song.id}>
                                    <ListItem 
                                        sx={{ 
                                            // Estilos para destacar a música tocando
                                            backgroundColor: isCurrentlyPlaying ? 'var(--input-bg)' : 'transparent',
                                            borderLeft: isCurrentlyPlaying ? '4px solid var(--orange)' : '4px solid transparent',
                                            borderRadius: '0 12px 12px 0',
                                            cursor: 'default',
                                            transition: 'background-color 0.2s',
                                            '&:hover': { backgroundColor: 'var(--input-bg)' }
                                        }}
                                    >
                                        {/* Número da Fila / Ícone de Reprodução */}
                                        <Box sx={{ width: '40px', textAlign: 'center' }}>
                                            {isCurrentlyPlaying ? (
                                                <i className="fas fa-volume-up" style={{ color: 'var(--orange)', fontSize: '14px' }} />
                                            ) : (
                                                <Typography sx={{ color: 'var(--secondary-text-color)' }}>{index + 1}</Typography>
                                            )}
                                        </Box>

                                        {/* Informações da Música */}
                                        <ListItemText
                                            primary={song.title}
                                            secondary={`${song.artist} - ${song.album}`}
                                            primaryTypographyProps={{ 
                                                fontWeight: 'bold', 
                                                color: isCurrentlyPlaying ? 'var(--orange)' : 'var(--text-color)' 
                                            }}
                                            secondaryTypographyProps={{ 
                                                color: 'var(--secondary-text-color)'
                                            }}
                                            sx={{ marginLeft: '10px' }}
                                        />
                                        
                                        {/* Duração */}
                                        <Typography sx={{ color: 'var(--secondary-text-color)' }}>
                                            {song.duration}
                                        </Typography>

                                    </ListItem>
                                    <Divider component="li" sx={{ backgroundColor: 'var(--border-color)' }} />
                                </React.Fragment>
                            );
                        })
                    )}
                </List>
            </Box>
        </main>
    );
}

export default Fila;