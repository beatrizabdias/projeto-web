import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, IconButton, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// 1. Importações do Redux
import { useSelector, useDispatch } from 'react-redux';
import { setQueue, togglePlayPause, setCurrentSong } from '../../store/playerSlice'; // Importa as actions necessárias

// Importa os arquivos JSON
import allMusics from '../musicas/musicas.json';
import allPlaylists from '../musicas/playlists.json'; 


// --- Constantes e Componentes Estilizados (MANTIDOS) ---
const INACTIVE_ICON_COLOR = 'var(--secondary-text-color)';

const PlaylistHeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex', alignItems: 'flex-end', gap: '30px', marginBottom: '40px', padding: '20px', backgroundColor: 'var(--card-bg)', borderRadius: '12px',
    ['@media (max-width:960px)']: { flexDirection: 'column', alignItems: 'flex-start' },
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
    width: '56px', 
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'var(--orange)', 
    color: 'white', 
    fontSize: '26px', 
    boxShadow: '0 4px 15px rgba(255, 107, 0, 0.4)', 
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',

    '&:hover': { 
        transform: 'scale(1.1)', 
        backgroundColor: 'var(--darker-orange)',
        boxShadow: '0 6px 20px rgba(255, 107, 0, 0.7)',
    },
}));

const ActionIcon = styled(IconButton)(({ theme }) => ({
    color: INACTIVE_ICON_COLOR,
    width: '40px',
    height: '40px',
    transition: 'color 0.2s ease',
    '&:hover': {
        color: 'var(--text-color)',
        backgroundColor: 'transparent',
    },
}));

const SearchSongsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '300px', 
    height: '38px',
    backgroundColor: 'var(--input-bg)', 
    borderRadius: '20px',
    padding: '0 5px 0 10px',
    transition: 'box-shadow 0.3s ease',
    marginLeft: 'auto',
    
    '&:focus-within': {
        boxShadow: `0 0 0 1px var(--secondary-text-color)`, 
    },
    '& .MuiSvgIcon-root': {
        color: 'var(--secondary-text-color)',
        fontSize: '20px',
        marginRight: '10px',
        marginLeft: '5px',
    }
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
    color: 'var(--input-text-color)',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: '5px 0',
        fontSize: '0.95rem',
    },
    '& ::placeholder': {
        color: INACTIVE_ICON_COLOR,
        opacity: 0.8,
    },
}));


function PlaylistDetalhe() {
    const { id } = useParams();
    const playlistId = parseInt(id); // Converte para número

    // Hooks do Redux
    const dispatch = useDispatch();
    const { currentSong, isPlaying } = useSelector(state => state.player); // Pega o estado do player

    // 1. Encontra os detalhes da Playlist no playlists.json
    const playlistDetails = allPlaylists.find(pl => pl.id === playlistId); 
    
    // 2. Filtra as Músicas da Playlist: Lógica para Músicas Curtidas (ID 0)
    let playlistSongs = [];
    
    if (playlistId === 0) {
        // Músicas Curtidas: filtra todas as músicas onde isLiked é true
        playlistSongs = allMusics.filter(music => music.isLiked === true);
    } else {
        // Playlists Normais: filtra pelo playlistId
        playlistSongs = allMusics.filter(music => music.playlistId === playlistId);
    }
    
    // 3. Monta o objeto final da playlist
    const playlist = playlistDetails 
        ? {
            ...playlistDetails,
            songs: playlistSongs,
            songCount: playlistSongs.length
        }
        : null;
        
    const [hoveredSongId, setHoveredSongId] = useState(null); 

    // Se a playlist não for encontrada, exibe uma mensagem de erro simples
    if (!playlist) {
        return <main className="content-area" style={{paddingTop: '50px'}}><Typography variant="h4" color="error">Playlist Não Encontrada! (ID: {id})</Typography></main>;
    }
    
    // Verifica se a música atual pertence a esta playlist
    const isThisPlaylistPlaying = isPlaying && playlist.songs.some(song => song.id === currentSong?.id); 
    
    // FUNÇÃO PARA TOCAR A PLAYLIST (Botão Principal)
    const handlePlaylistPlay = () => {
        if (isThisPlaylistPlaying) {
            // Se já está tocando, pausa
            dispatch(togglePlayPause());
        } else {
            // Se não está tocando, inicia a playlist (limpa a fila e começa)
            dispatch(setQueue({ songs: playlist.songs, startIndex: 0 }));
        }
    };
    
    // FUNÇÃO PARA TOCAR MÚSICA INDIVIDUAL
    const handleSongClick = (song) => {
        if (currentSong?.id === song.id) {
             // Se é a mesma música, apenas alterna play/pause
             dispatch(togglePlayPause());
        } else {
             // Se for outra música, configura a fila para iniciar com esta música
             
             // 1. Encontra o índice da música na playlist atual (que será a nova fila)
             const newQueue = playlist.songs;
             const startIndex = newQueue.findIndex(s => s.id === song.id);
             
             // 2. Seta a nova fila no Redux, iniciando na música clicada
             if (startIndex !== -1) {
                 dispatch(setQueue({ songs: newQueue, startIndex: startIndex }));
             }
             
             // Nota: setQueue já configura currentSong e isPlaying = true
        }
    }


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
                    disabled={playlist.songs.length === 0} // Desabilita se a fila for vazia (ex: curtidas vazias)
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

            {/* 3. LISTA DE MÚSICAS (Tabela) */}
            <TableContainer className="songs-list" sx={{ background: 'transparent' }}>
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
                        {playlist.songs.map((song, index) => {
                            const isCurrentRowPlaying = currentSong?.id === song.id && isPlaying;
                            const isRowHovered = hoveredSongId === song.id;

                            return (
                                <TableRow 
                                    key={song.id} 
                                    className="songs-list-row"
                                    onClick={() => handleSongClick(song)} 
                                    onMouseEnter={() => setHoveredSongId(song.id)}
                                    onMouseLeave={() => setHoveredSongId(null)}
                                    sx={{ 
                                        cursor: 'pointer', 
                                        transition: 'background-color 0.2s ease', 
                                        borderRadius: '8px', 
                                        marginBottom: '5px', 
                                        backgroundColor: isCurrentRowPlaying ? 'var(--input-bg)' : 'transparent',
                                        '&:hover': { backgroundColor: 'var(--card-bg)' } 
                                    }}
                                >
                                    {/* CÉLULA DO NÚMERO (#) / ÍCONE - Lógica de Hover */}
                                    <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none', width: '40px', padding: '15px' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '18px' }}>
                                            {isRowHovered ? (
                                                <IconButton 
                                                    size="small" 
                                                    onClick={(e) => { e.stopPropagation(); handleSongClick(song); }} 
                                                    sx={{ color: 'var(--text-color)', '&:hover': { backgroundColor: 'transparent' } }}
                                                >
                                                    {isCurrentRowPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                                                </IconButton>
                                            ) : (
                                                isCurrentRowPlaying ? (
                                                    <i className="fas fa-volume-up" style={{ color: 'var(--orange)', fontSize: '14px' }} />
                                                ) : (
                                                    <Typography sx={{ color: 'var(--secondary-text-color)', fontSize: '0.9rem' }}>{index + 1}</Typography>
                                                )
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: 'none' }}>
                                        <Box className="song-info" sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <img src={song.cover} alt="Song Cover" style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} />
                                            <Box>
                                                <Typography 
                                                    className="song-title" 
                                                    sx={{ 
                                                        fontWeight: 'bold', 
                                                        display: 'block', 
                                                        color: isCurrentRowPlaying ? 'var(--orange)' : 'var(--text-color)' 
                                                    }}
                                                >
                                                    {song.title}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none' }}>{song.album}</TableCell>
                                    <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none' }}>{song.added}</TableCell>
                                    <TableCell sx={{ color: 'var(--text-color)', borderBottom: 'none' }} align="right">{song.duration}</TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </main>
    );
}

export default PlaylistDetalhe;