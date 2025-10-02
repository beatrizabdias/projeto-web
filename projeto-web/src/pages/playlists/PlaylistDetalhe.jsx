import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, IconButton, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause'; 
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useMusicPlayer } from '../../context/MusicPlayerContext';

// --- Dados Mock (Simulando a busca de uma API) ---
const mockPlaylist = {
    id: 1,
    cover: "/assets/img/vacateste.jpg", 
    title: "Nome playlist 1",
    type: "PLAYLIST PÚBLICA",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, inventore quisquam fuga vel...",
    creator: "Maria",
    songCount: 100,
    duration: "2h 30min",
    songs: [
        { id: 1, title: "Música 1", artist: "Artista 1", album: "Álbum 1", added: "25 de fev. de 2025", duration: "3:27", cover: "/assets/img/vacateste.jpg" },
        { id: 2, title: "Música 2", artist: "Artista 2", album: "Álbum 2", added: "21 de fev. de 2022", duration: "3:13", cover: "/assets/img/vacateste.jpg" },
    ]
};

// --- Constantes de Estilo ---
const INACTIVE_ICON_COLOR = 'var(--secondary-text-color)';

// --- Componentes Estilizados ---

const PlaylistHeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex', alignItems: 'flex-end', gap: '30px', marginBottom: '40px', padding: '20px', backgroundColor: 'var(--card-bg)', borderRadius: '12px',
    [theme.breakpoints.down('md')]: { flexDirection: 'column', alignItems: 'flex-start' },
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
    const playlist = mockPlaylist; 
    
    // ESTADOS GLOBAIS
    const { currentSong, isPlaying, playSong, togglePlayPause } = useMusicPlayer();
    
    // ESTADO LOCAL: Rastrea qual linha está sob o mouse
    const [hoveredSongId, setHoveredSongId] = useState(null); 

    // Variável de controle: verifica se esta playlist está tocando
    const isThisPlaylistPlaying = isPlaying && currentSong?.sourceId === `playlist-${id}`;
    
    // FUNÇÃO PARA TOCAR A PLAYLIST (Botão Principal)
    const handlePlaylistPlay = () => {
        if (isThisPlaylistPlaying) {
            togglePlayPause();
        } else {
            const firstSong = playlist.songs[0];
            playSong({
                url: `/assets/audio/relaxingpiano.mp3`, 
                title: firstSong.title,
                artist: firstSong.artist,
                sourceId: `playlist-${id}` 
            });
        }
    };
    
    // FUNÇÃO PARA TOCAR MÚSICA INDIVIDUAL (Clique na Linha da Tabela)
    const handleSongClick = (song) => {
        // Se a música clicada já estiver tocando, pausa. Caso contrário, toca.
        if (currentSong?.sourceId === `song-${song.id}` && isPlaying) {
             togglePlayPause();
        } else {
             playSong({
                url: `/assets/audio/relaxingpiano.mp3`, 
                title: song.title,
                artist: song.artist,
                sourceId: `song-${song.id}` 
             });
        }
    }

    return (
        <main className="content-area playlist-page">
            
            {/* 1. CABEÇALHO DA PLAYLIST */}
            <PlaylistHeaderContainer>
                <img src={playlist.cover} alt="Playlist Cover" style={{ width: '250px', height: '250px', borderRadius: '12px', boxShadow: '0 10px 30px var(--shadow-color-dark)', objectFit: 'cover' }}/>
                <Box className="header-info">
                    <Typography variant="overline" className="playlist-type" sx={{ color: 'var(--secondary-text-color)', fontWeight: 'bold' }}>{playlist.type}</Typography>
                    <Typography variant="h3" component="h1" sx={{ color: 'var(--text-color)', fontWeight: 'bold', margin: '10px 0' }}>{playlist.title}</Typography>
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
                            const isCurrentRowPlaying = currentSong?.sourceId === `song-${song.id}` && isPlaying;
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
                                                    onClick={() => handleSongClick(song)} // Chama a ação de play/pause
                                                    sx={{ color: 'var(--text-color)', '&:hover': { backgroundColor: 'transparent' } }}
                                                >
                                                    {isCurrentRowPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                                                </IconButton>
                                            ) : (
                                                isCurrentRowPlaying ? (
                                                    // Ícone de volume (tocando)
                                                    <i className="fas fa-volume-up" style={{ color: 'var(--orange)', fontSize: '14px' }} />
                                                ) : (
                                                    // Número da música
                                                    <Typography sx={{ color: 'var(--secondary-text-color)', fontSize: '0.9rem' }}>{index + 1}</Typography>
                                                )
                                            )}
                                        </Box>
                                    </TableCell>
                                    {/* ... O restante das TableCells ... */}
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