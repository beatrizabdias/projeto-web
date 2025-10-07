// QueueOverlay.jsx (Código CORRIGIDO)

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; 

// Importe as actions do seu slice (assumindo que estão corretas)
import { reorderQueue, togglePlayPause, setQueue } from '../store/playerSlice'; 

// Estilos de Destaque
const VolumeIcon = () => (<i className="fas fa-volume-up" style={{ color: 'var(--orange)', fontSize: '12px' }} />);
const INACTIVE_COLOR = 'var(--secondary-text-color)';


const QueueOverlayContainer = styled(Box)(({ theme }) => ({
    // Estilos de posição fixa mantidos para o overlay
    position: 'fixed', 
    top: '70px', 
    left: '100px', 
    height: 'calc(100vh - 150px)', 
    width: '350px', 
    backgroundColor: 'var(--sidebar-bg)', 
    borderRadius: '8px', 
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    padding: '0', 
    overflowY: 'auto',
    width: { xs: '100%', sm: '350px' } 
}));

function QueueOverlay() {
    const { queue, currentSong, isPlaying } = useSelector(state => state.player); 
    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        if (!result.destination) return; 
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        if (sourceIndex === destinationIndex) return;
        
        dispatch(reorderQueue({ sourceIndex, destinationIndex }));
    };
    
    // Função para tocar a música na fila
    const handlePlayQueueItem = (song) => {
        if (currentSong?.id === song.id) {
            dispatch(togglePlayPause());
        } else {
            const startIndex = queue.findIndex(s => s.id === song.id);
            if (startIndex !== -1) {
                dispatch(setQueue({ songs: queue, startIndex: startIndex }));
            }
        }
    };


    const renderQueueItem = (song, index) => {
        // CORREÇÃO: Usar currentSong?.id
        const isCurrentlyPlaying = currentSong?.id === song.id; 
        
        return (
            <Draggable key={song.id} draggableId={String(song.id)} index={index}>
                {(provided, snapshot) => (
                    <ListItem 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                            padding: '12px 15px', 
                            backgroundColor: isCurrentlyPlaying ? 'var(--card-bg)' : 'transparent',
                            borderLeft: isCurrentlyPlaying ? '4px solid var(--orange)' : '4px solid transparent',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            '&:hover': { backgroundColor: 'var(--card-bg)' },
                            ...(snapshot.isDragging && { backgroundColor: 'var(--input-bg)' })
                        }}
                        onClick={() => handlePlayQueueItem(song)}
                    >
                        {/* 1. Alça de Arraste (Drag Handle) */}
                        <Box {...provided.dragHandleProps} sx={{ color: INACTIVE_COLOR, display: 'flex', alignItems: 'center', mr: 1, cursor: 'grab' }}>
                            <DragIndicatorIcon fontSize="small" />
                        </Box>
                        
                        {/* 2. Ícone / Número */}
                        <Box sx={{ width: '25px', textAlign: 'center' }}>
                            {isCurrentlyPlaying ? (<VolumeIcon />) : (<Typography sx={{ color: INACTIVE_COLOR, fontSize: '0.8rem' }}>{index + 1}</Typography>)}
                        </Box>

                        {/* 3. Capa e Título (MAIOR) */}
                        <ListItemAvatar sx={{ minWidth: '50px', ml: 1 }}>
                            {/* CORRIGIDO: De song.imagem para song.cover */}
                            <Avatar src={song.cover} alt="Capa" variant="square" sx={{ width: 50, height: 50 }} /> 
                        </ListItemAvatar>
                        
                        {/* 4. Título, Artista e Duração */}
                        <ListItemText
                            // CORRIGIDO: De song.titulo para song.title
                            primary={song.title} 
                            // CORRIGIDO: De song.artista para song.artist
                            secondary={song.artist + ' • ' + song.album} // Concatena artista e álbum no secondary
                            primaryTypographyProps={{ 
                                fontWeight: 'bold', fontSize: '1rem', 
                                color: isCurrentlyPlaying ? 'var(--orange)' : 'var(--text-color)',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            }}
                            secondaryTypographyProps={{ 
                                color: INACTIVE_COLOR, fontSize: '0.8rem' 
                            }}
                            sx={{ marginLeft: '15px' }}
                        />
                        
                        {/* 5. Duração e Botão Remover */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ color: INACTIVE_COLOR, fontSize: '0.8rem' }}>
                                {/* CORRIGIDO: De song.duracao para song.duration */}
                                {song.duration}
                            </Typography>
                            {/* Botão Remover */}
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); console.log('Remover'); }} sx={{ color: INACTIVE_COLOR, '&:hover': { color: 'red' } }}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </ListItem>
                )}
            </Draggable>
        );
    };


    return (
        <QueueOverlayContainer>
            <Typography variant="h6" sx={{ color: 'var(--text-color)', fontWeight: 'bold', padding: '15px 15px 10px', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, backgroundColor: 'var(--sidebar-bg)', zIndex: 1 }}>
                Próximas na Fila ({queue.length})
            </Typography>
            
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="queue">
                    {(provided) => (
                        <List 
                            ref={provided.innerRef} 
                            {...provided.droppableProps} 
                            sx={{ padding: 0 }}
                        >
                            {queue.length === 0 ? (
                                <Typography sx={{ color: 'var(--secondary-text-color)', padding: '15px' }}>
                                    A fila está vazia.
                                </Typography>
                            ) : (
                                queue.map((song, index) => renderQueueItem(song, index))
                            )}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        </QueueOverlayContainer>
    );
}

export default QueueOverlay;