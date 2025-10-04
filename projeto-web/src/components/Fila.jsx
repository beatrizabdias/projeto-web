// QueueOverlay.jsx (Adaptado para Redux)

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

// 1. Importações do Redux
import { useSelector } from 'react-redux'; 

function QueueOverlay() {
    // LER o estado da fila e da música atual do Redux
    const { queue, currentSong } = useSelector(state => state.player); 

    // Box principal estilizado para ocupar 100% da altura disponível no Overlay Container
    return (
        <Box 
            sx={{ 
                width: '300px', 
                height: '100%', 
                backgroundColor: 'var(--sidebar-bg)', 
                borderRadius: '8px', 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                padding: '0', 
                overflowY: 'auto', 
            }}
        >
            <Typography 
                variant="h6" 
                sx={{ 
                    color: 'var(--text-color)', 
                    fontWeight: 'bold', 
                    padding: '15px 15px 10px', 
                    borderBottom: '1px solid var(--border-color)',
                    position: 'sticky', 
                    top: 0, 
                    backgroundColor: 'var(--sidebar-bg)', 
                    zIndex: 1,
                }}
            >
                Próximas na Fila ({queue.length})
            </Typography>
            
            <List sx={{ padding: 0 }}>
                {queue.length === 0 ? (
                    <Typography sx={{ color: 'var(--secondary-text-color)', padding: '15px' }}>
                        A fila está vazia.
                    </Typography>
                ) : (
                    queue.map((song, index) => {
                        // Verifica o ID da música na fila com o ID da música atual no Redux
                        const isCurrentlyPlaying = currentSong && song.id === currentSong.id;
                        
                        return (
                            <React.Fragment key={song.id}>
                                <ListItem 
                                    // ... (Estilos da Linha da Música Mantidos)
                                    sx={{ 
                                        padding: '8px 15px',
                                        backgroundColor: isCurrentlyPlaying ? 'var(--input-bg)' : 'transparent',
                                        borderLeft: isCurrentlyPlaying ? '4px solid var(--orange)' : '4px solid transparent',
                                        cursor: 'default',
                                        transition: 'background-color 0.2s',
                                        '&:hover': { backgroundColor: 'var(--card-bg)' }
                                    }}
                                >
                                    {/* Conteúdo da Música Mantido */}
                                    <Box sx={{ width: '25px', textAlign: 'center' }}>
                                        {isCurrentlyPlaying ? (
                                            <i className="fas fa-volume-up" style={{ color: 'var(--orange)', fontSize: '12px' }} />
                                        ) : (
                                            <Typography sx={{ color: 'var(--secondary-text-color)', fontSize: '0.8rem' }}>{index + 1}</Typography>
                                        )}
                                    </Box>

                                    <ListItemText
                                        // Usando 'title' e 'artist' do seu JSON
                                        primary={song.title} 
                                        secondary={song.artist}
                                        primaryTypographyProps={{ 
                                            fontWeight: 'bold', fontSize: '0.9rem',
                                            color: isCurrentlyPlaying ? 'var(--orange)' : 'var(--text-color)',
                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                        }}
                                        secondaryTypographyProps={{ 
                                            color: 'var(--secondary-text-color)', fontSize: '0.75rem'
                                        }}
                                        sx={{ marginLeft: '10px' }}
                                    />
                                    
                                    <Typography sx={{ color: 'var(--secondary-text-color)', fontSize: '0.8rem' }}>
                                        {song.duration}
                                    </Typography>
                                </ListItem>
                            </React.Fragment>
                        );
                    })
                )}
            </List>
        </Box>
    );
}

export default QueueOverlay;