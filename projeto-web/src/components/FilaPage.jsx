import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, IconButton, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'; // Ícone de arraste (Drag Handle)

// 1. Importações D&D e Redux
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; 
import { useSelector, useDispatch } from 'react-redux';
import { setQueue, togglePlayPause, reorderQueue } from '../store/playerSlice'; 

// Importa os arquivos JSON (assumindo que estas variáveis são arrays)
import allMusics from '../pages/musicas/musicas.json';
import allPlaylists from '../pages/musicas/playlists.json'; 


// --- Constantes e Componentes Estilizados (Mantidos) ---
const INACTIVE_ICON_COLOR = 'var(--secondary-text-color)';

const PlaylistHeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex', alignItems: 'flex-end', gap: '30px', marginBottom: '40px', padding: '20px', backgroundColor: 'var(--card-bg)', borderRadius: '12px',
    ['@media (max-width:960px)']: { flexDirection: 'column', alignItems: 'flex-start' },
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
    width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--orange)', color: 'white', fontSize: '26px', boxShadow: '0 4px 15px rgba(255, 107, 0, 0.4)', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': { transform: 'scale(1.1)', backgroundColor: 'var(--darker-orange)', boxShadow: '0 6px 20px rgba(255, 107, 0, 0.7)' },
}));

const ActionIcon = styled(IconButton)(({ theme }) => ({
    color: INACTIVE_ICON_COLOR, width: '40px', height: '40px', transition: 'color 0.2s ease',
    '&:hover': { color: 'var(--text-color)', backgroundColor: 'transparent' },
}));

const SearchSongsContainer = styled(Box)(({ theme }) => ({
    display: 'flex', alignItems: 'center', width: '300px', height: '38px', backgroundColor: 'var(--input-bg)', 
    borderRadius: '20px', padding: '0 5px 0 10px', transition: 'box-shadow 0.3s ease', marginLeft: 'auto',
    '&:focus-within': { boxShadow: `0 0 0 1px var(--secondary-text-color)` },
    '& .MuiSvgIcon-root': { color: 'var(--secondary-text-color)', fontSize: '20px', marginRight: '10px', marginLeft: '5px' }
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
    color: 'var(--input-text-color)', width: '100%',
    '& .MuiInputBase-input': { padding: '5px 0', fontSize: '0.95rem' },
    '& ::placeholder': { color: INACTIVE_ICON_COLOR, opacity: 0.8 },
}));


function PlaylistDetalhe() {
    const { id } = useParams();
    const playlistId = parseInt(id); 

    // Hooks do Redux
    const dispatch = useDispatch();
    const { currentSong, isPlaying } = useSelector(state => state.player); 

    // 1. Lógica de Filtragem de Músicas
    let initialSongs = [];
    if (playlistId === 0) {
        initialSongs = allMusics.filter(music => music.isLiked === true);
    } else {
        initialSongs = allMusics.filter(music => music.playlistId === playlistId);
    }
    
    const playlistDetails = allPlaylists.find(pl => pl.id === playlistId); 
    const playlist = playlistDetails 
        ? { ...playlistDetails, songs: initialSongs, songCount: initialSongs.length }
        : null;
        
    const [hoveredSongId, setHoveredSongId] = useState(null); 
    
    // CRÍTICO: Estado Local para a Ordem da Playlist (permite o D&D local)
    const [localSongs, setLocalSongs] = useState(playlist ? playlist.songs : []);

    // Sincroniza o estado local APENAS quando a playlistId muda
    React.useEffect(() => {
        if (playlist) {
            setLocalSongs(playlist.songs);
        }
    }, [playlistId]);


    if (!playlist) {
        return <main className="content-area" style={{paddingTop: '50px'}}><Typography variant="h4" color="error">Playlist Não Encontrada! (ID: {id})</Typography></main>;
    }
    
    const isThisPlaylistPlaying = isPlaying && localSongs.some(song => song.id === currentSong?.id); 
    
    // FUNÇÃO PARA TOCAR A PLAYLIST
    const handlePlaylistPlay = () => {
        if (isThisPlaylistPlaying) {
            dispatch(togglePlayPause());
        } else {
            // Usa a ordem LOCAL das músicas para iniciar a fila
            dispatch(setQueue({ songs: localSongs, startIndex: 0 }));
        }
    };
    
    // FUNÇÃO PARA TOCAR MÚSICA INDIVIDUAL
    const handleSongClick = (song, index) => {
        if (currentSong?.id === song.id) {
            dispatch(togglePlayPause());
        } else {
             // Seta a fila usando a ordem LOCAL, iniciando na música clicada
             dispatch(setQueue({ songs: localSongs, startIndex: index }));
        }
    }

    // CRÍTICO: Lógica de Drag and Drop
    const onDragEnd = (result) => {
        if (!result.destination) return;
        
        const { source, destination } = result;
        
        const newSongs = Array.from(localSongs);
        const [movedItem] = newSongs.splice(source.index, 1);
        newSongs.splice(destination.index, 0, movedItem);
        
        // 1. Atualiza o estado local para o feedback visual imediato
        setLocalSongs(newSongs);

        // 2. CRÍTICO: Atualiza a fila global do Redux (IMPORTANTE)
        const currentSongIndex = newSongs.findIndex(s => s.id === currentSong?.id);
        dispatch(setQueue({ songs: newSongs, startIndex: currentSongIndex }));
        
        // Aqui você faria a chamada API para salvar a nova ordem no backend.
    };


    return (
        <main className="content-area playlist-page">
            
            {/* 1. CABEÇALHO DA PLAYLIST */}
            <PlaylistHeaderContainer>
                <img src={playlist.img} alt="Playlist Cover" style={{ width: '250px', height: '250px', borderRadius: '12px', boxShadow: '0 10px 30px var(--shadow-color-dark)', objectFit: 'cover' }}/>
                <Box className="header-info">
                    <Typography variant="overline" className="playlist-type" sx={{ color: 'var(--secondary-text-color)', fontWeight: 'bold' }}>{playlist.type}</Typography>
                    <Typography variant="h3" component="h1" sx={{ color: 'var(--text-color)', fontWeight: 'bold', margin: '10px 0' }}>{playlist.name}</Typography>
                    <Typography className="playlist-description" sx={{ color: 'var(--secondary-text-color)', maxWidth: '600px' }}>{playlist.description}</Typography>
                    <Typography variant="body2" className="playlist-stats" sx={{ color: 'var(--secondary-text-color)', marginTop: '10px' }}>
                        Criada por <Link to={`/perfil/${playlist.creator}`} style={{ color: 'var(--text-color)', fontWeight: 'bold', textDecoration: 'none' }}>{playlist.creator}</Link> 
                        • <span>{playlist.songCount} músicas</span> 
                        • <span>{playlist.duration}</span>
                    </Typography>
                </Box>
            </PlaylistHeaderContainer>

            {/* 2. BARRA DE AÇÕES (Design Minimalista) */}
            <Box className="actions-bar" sx={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', padding: '0 20px' }}>
                
                <PlayButton 
                    aria-label={isThisPlaylistPlaying ? "Pausar Playlist" : "Tocar Playlist"}
                    onClick={handlePlaylistPlay}
                    disabled={localSongs.length === 0} 
                >
                    {isThisPlaylistPlaying ? <PauseIcon sx={{ fontSize: '32px' }} /> : <PlayArrowIcon sx={{ fontSize: '32px' }} />}
                </PlayButton>
                
                <ActionIcon aria-label="Shuffle"><i className="fas fa-random" style={{ fontSize: '20px' }} /></ActionIcon> 
                <ActionIcon aria-label="More Options"><i className="fas fa-ellipsis-h" style={{ fontSize: '20px' }} /></ActionIcon>

                <SearchSongsContainer>
                    <SearchInput placeholder="Ordem personalizada" disableUnderline />
                    <i className="fas fa-list-ul" style={{ color: INACTIVE_ICON_COLOR, fontSize: '18px', marginLeft: '10px' }} />
                </SearchSongsContainer>
            </Box>

            {/* 3. LISTA DE MÚSICAS (Tabela com D&D) */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="playlist-detail">
                    {(provided) => (
                        <TableContainer 
                            className="songs-list" 
                            sx={{ background: 'transparent' }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <Table sx={{ borderSpacing: '0 0', borderCollapse: 'separate' }}>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'var(--card-bg)', '& th': { borderBottom: '1px solid var(--border-color)', padding: '15px', fontWeight: 'normal' }}}>
                                        <TableCell sx={{ color: 'var(--secondary-text-color)' }}>#</TableCell>
                                        <TableCell sx={{ color: 'var(--secondary-text-color)' }}>Título</TableCell>
                                        <TableCell sx={{ color: 'var(--secondary-text-color)' }}>Álbum</TableCell>
                                        <TableCell sx={{ color: 'var(--secondary-text-color)' }}>Adicionada em</TableCell>
                                        <TableCell sx={{ color: 'var(--secondary-text-color)', width: '50px' }} align="right"><AccessTimeIcon fontSize="small" /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {localSongs.map((song, index) => { // Renderiza o estado LOCAL
                                        const isCurrentRowPlaying = currentSong?.id === song.id && isPlaying;
                                        const isRowHovered = hoveredSongId === song.id;

                                        return (
                                            <Draggable key={song.id} draggableId={String(song.id)} index={index}>
                                                {(draggableProvided, draggableSnapshot) => (
                                                    <TableRow 
                                                        ref={draggableProvided.innerRef}
                                                        {...draggableProvided.draggableProps}
                                                        
                                                        className="songs-list-row"
                                                        onClick={() => handleSongClick(song, index)} 
                                                        onMouseEnter={() => setHoveredSongId(song.id)}
                                                        onMouseLeave={() => setHoveredSongId(null)}
                                                        sx={{ 
                                                            cursor: 'default', 
                                                            transition: 'background-color 0.2s ease', 
                                                            borderRadius: '8px', 
                                                            marginBottom: '5px', 
                                                            backgroundColor: draggableSnapshot.isDragging ? 'var(--input-bg)' : (isCurrentRowPlaying ? 'var(--input-bg)' : 'transparent'),
                                                            '&:hover': { backgroundColor: 'var(--card-bg)' } 
                                                        }}
                                                    >
                                                        {/* 1. CÉLULA DRAG HANDLE / ÍCONE */}
                                                        <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none', width: '40px', padding: '15px' }}>
                                                            <Box {...draggableProvided.dragHandleProps} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '18px', cursor: 'grab' }}>
                                                                {isRowHovered ? (
                                                                    <DragIndicatorIcon fontSize="small" sx={{ color: 'var(--secondary-text-color)' }} />
                                                                ) : (
                                                                    <Typography sx={{ color: 'var(--secondary-text-color)', fontSize: '0.9rem' }}>{index + 1}</Typography>
                                                                )}
                                                            </Box>
                                                        </TableCell>
                                                        
                                                        {/* 2. Conteúdo e Outras Células */}
                                                        <TableCell sx={{ borderBottom: 'none' }}>
                                                            <Box className="song-info" sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                                {/* Imagem de Capa */}
                                                                <img src={song.cover} alt="Song Cover" style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} />
                                                                <Box>
                                                                    <Typography className="song-title" sx={{ fontWeight: 'bold', display: 'block', color: isCurrentRowPlaying ? 'var(--orange)' : 'var(--text-color)' }}>{song.title}</Typography>
                                                                    <Typography className="song-artist" sx={{ color: 'var(--secondary-text-color)', fontSize: '0.9rem' }}>{song.artist}</Typography>
                                                                </Box>
                                                            </Box>
                                                        </TableCell>
                                                        
                                                        <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none' }}>{song.album}</TableCell>
                                                        <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none' }}>{song.added}</TableCell>
                                                        <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none' }} align="right">{song.duration}</TableCell>

                                                    </TableRow>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Droppable>
            </DragDropContext>

        </main>
    );
}

export default PlaylistDetalhe;