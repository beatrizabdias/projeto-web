// src/pages/FilaPage.jsx

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

// -------------------------------------------------------------------
// 1. Container Principal (Adaptado para PÁGINA)
// -------------------------------------------------------------------

const FilaPageContainer = styled(Box)(({ theme }) => ({
    // Ocupa o fluxo normal da área de conteúdo (content-area)
    padding: '20px', 
    margin: '0 auto', // Centraliza o conteúdo (desktop)
    maxWidth: '800px', // Limite de largura para desktop
    width: '100%', 
    minHeight: 'calc(100vh - 150px)', // Ocupa a altura restante da tela
    
    // Adicione um pouco de padding-top para o conteúdo ficar abaixo do Header
    paddingTop: '80px', 
    
    // Opcional: Estilo de fundo, se a página precisar de um container visual
    // backgroundColor: 'var(--main-bg)', 
}));

// -------------------------------------------------------------------
// 2. Componente FilaPage
// -------------------------------------------------------------------

function FilaPage() {
    const { queue, currentSong, isPlaying } = useSelector(state => state.player); 
    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        if (!result.destination) return; 
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        if (sourceIndex === destinationIndex) return;
        
        // Dispara a reordenação no Redux
        dispatch(reorderQueue({ sourceIndex, destinationIndex }));

        // Nota: A função reorderQueue no seu slice precisa garantir
        // que o 'currentSong' e o 'queueIndex' sejam reajustados corretamente
        // se a música atualmente tocando foi movida.
    };
    
    // Função para tocar a música na fila
    const handlePlayQueueItem = (song) => {
        if (currentSong?.id === song.id) {
            dispatch(togglePlayPause());
        } else {
            const startIndex = queue.findIndex(s => s.id === song.id);
            if (startIndex !== -1) {
                // Seta a nova fila (com a ordem atualizada pelo D&D) e inicia no clique
                dispatch(setQueue({ songs: queue, startIndex: startIndex }));
            }
        }
    };

    const handleRemoveSong = (e, songId) => {
        e.stopPropagation(); // Evita que o clique toque a música
        console.log(`Remover música com ID: ${songId}`);
        // TODO: Implementar a action 'removeSongFromQueue' no playerSlice
        // dispatch(removeSongFromQueue(songId));
    };


    const renderQueueItem = (song, index) => {
        // Verifica se a música tocando no player tem o mesmo ID desta linha
        const isCurrentlyPlaying = currentSong?.id === song.id; 
        
        return (
            <Draggable key={song.id} draggableId={String(song.id)} index={index}>
                {(provided, snapshot) => (
                    <ListItem 
                        // ... (código omitido) ...
                        onClick={() => handlePlayQueueItem(song)}
                    >
                        {/* 1. Alça de Arraste e 2. Ícone / Número (mantidos) */}
                        
                        {/* 3. Capa e Título (CORREÇÃO DA IMAGEM) */}
                        <ListItemAvatar sx={{ minWidth: '50px', ml: 1, flexShrink: 0 }}>
                            {/* CORRIGIDO: De song.imagem para song.cover */}
                            <Avatar src={song.cover} alt="Capa" variant="square" sx={{ width: 50, height: 50 }} /> 
                        </ListItemAvatar>
                        
                        {/* 4. Título, Artista e Duração (CORREÇÃO DOS TEXTOS) */}
                        <ListItemText
                            // CORRIGIDO: De song.titulo para song.title
                            primary={song.title} 
                            // CORRIGIDO: De song.artista para song.artist e usa song.album
                            secondary={song.artist + (song.album ? (window.innerWidth > 600 ? ' • ' + song.album : '') : '')} 
                            primaryTypographyProps={{ 
                                fontWeight: 'bold', fontSize: { xs: '0.9rem', sm: '1rem' }, 
                                color: isCurrentlyPlaying ? 'var(--orange)' : 'var(--text-color)',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            }}
                            secondaryTypographyProps={{ 
                                color: INACTIVE_COLOR, fontSize: '0.8rem' 
                            }}
                            sx={{ marginLeft: '15px', overflow: 'hidden' }}
                        />
                        
                        {/* 5. Duração e Botão Remover */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0, ml: 2 }}>
                            <Typography 
                                sx={{ 
                                    color: INACTIVE_COLOR, 
                                    fontSize: '0.8rem', 
                                    display: { xs: 'none', sm: 'block' } 
                                }}
                            >
                                {/* CORRIGIDO: De song.duracao para song.duration */}
                                {song.duration}
                            </Typography>
                            {/* Botão Remover (mantido) */}
                        </Box>
                    </ListItem>
                )}
            </Draggable>
        );
    };

    return (
        <FilaPageContainer>
            <Typography variant="h4" component="h1" sx={{ color: 'var(--text-color)', fontWeight: 'bold', mb: 3 }}>
                Fila de Reprodução
            </Typography>
            <Typography variant="h6" sx={{ color: 'var(--secondary-text-color)', fontWeight: 'bold', mb: 2 }}>
                Próximas Músicas ({queue.length})
            </Typography>
            
            {/* O Box abaixo simula a cor de fundo da sua fila (sidebar-bg) */}
            <Box sx={{ 
                backgroundColor: 'var(--sidebar-bg)', 
                borderRadius: '8px', 
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                padding: { xs: '10px 0', sm: '15px' },
            }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="queue-page">
                        {(provided) => (
                            <List 
                                ref={provided.innerRef} 
                                {...provided.droppableProps} 
                                sx={{ padding: 0 }}
                            >
                                {queue.length === 0 ? (
                                    <Typography sx={{ color: 'var(--secondary-text-color)', padding: '15px' }}>
                                        A fila está vazia. Adicione músicas para começar.
                                    </Typography>
                                ) : (
                                    queue.map((song, index) => renderQueueItem(song, index))
                                )}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </FilaPageContainer>
    );
}

export default FilaPage;