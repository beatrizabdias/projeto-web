import React, { useState } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';
import AlbumIcon from '@mui/icons-material/Album';
import QueueIcon from '@mui/icons-material/Queue';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLikeSongAsync } from '../redux/loginSlice';
import { playSong, togglePlayPause } from '../redux/playerSliceBebel'; 

const COR_LARANJA = 'var(--orange)'; 

export default function Song({ song }) {
    const { title, duration = "3:20", artist, artistId, albumId, id: songId } = song;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);
    const isLiked = user?.likedSongs?.includes(songId);

    const { currentSong, isPlaying } = useSelector(state => state.player);
    const isThisSongCurrentlySelected = currentSong?.id === songId;
    const isThisSongPlaying = isThisSongCurrentlySelected && isPlaying;

    const [anchorEl, setAnchorEl] = useState(null);
    const aberto = Boolean(anchorEl);

    const handleLikeClick = (e) => {
    e.stopPropagation(); 
    if (user) {
        dispatch(toggleLikeSongAsync({
            userId: user.id,
            songId: songId,
            currentLikedSongs: user.likedSongs || [], 
        }));
    } else {
        navigate('/login');
    }
}

    const handlePlayPauseClick = (e) => {
        e.stopPropagation();
        if (isThisSongCurrentlySelected) {
            dispatch(togglePlayPause());
        } else {
            dispatch(playSong(song));
        }
    };

    const handleMenuClick = (event) => {
        event.stopPropagation(); 
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    
    const menuOptions = [
        { icon: <AddIcon fontSize="small" />, label: 'Adicionar à playlist', action: () => console.log(`Adicionar ${title}`) },
        { icon: <PersonIcon fontSize="small" />, label: 'Ir para o artista', action: () => navigate(`/artista/${artistId}`) },
        { icon: <AlbumIcon fontSize="small" />, label: 'Ir para o álbum', action: () => navigate(`/álbum/${albumId}`) },
        { icon: <QueueIcon fontSize="small" />, label: 'Adicionar à fila', action: () => console.log(`Adicionar ${title}`) },
        { icon: <ShareIcon fontSize="small" />, label: 'Compartilhar', action: () => console.log(`Compartilhar ${title}`) },
    ];
    
    const corIcone = isLiked ? COR_LARANJA : 'var(--secondary-text-color)';
    
    return (
        <>
            <div className="song flex">
                <div className="song-detail flex">
                    
                    <div onClick={handlePlayPauseClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                         {isThisSongPlaying ? (
                            <PauseIcon 
                            onMouseEnter={(e) => (e.target.style.color = COR_LARANJA)}
                            onMouseLeave={(e) => (e.target.style.color = 'white')}/>
                        ) : (
                            <PlayArrowIcon 
                            onMouseEnter={(e) => (e.target.style.color = COR_LARANJA)}
                            onMouseLeave={(e) => (e.target.style.color = 'white')} />
                        )}
                    </div>

                    <div className="song-info flex" style={{ marginLeft: '15px' }}>
                        <span 
                            className="song-title"
                         >{title}</span>
                        <span className="song-artist">{artist}</span>
                    </div>
                </div>
                <div className="song-detail flex">
                    <div 
                        className="icon" 
                        onClick={handleLikeClick}
                        style={{ cursor: 'pointer', color: corIcone }}
                    >
                        {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    </div>
                    <span className="song-duration">{duration}</span>
                    <i 
                        className="icon fa-solid fa-ellipsis"
                        onClick={handleMenuClick}
                        style={{ cursor: 'pointer', color: 'var(--secondary-text-color)' }}
                    ></i>
                </div>
            </div>

            <Menu
                id="song-options-menu"
                anchorEl={anchorEl}
                open={aberto}
                onClose={handleMenuClose}
            >
                {menuOptions.map((option) => (
                    <MenuItem 
                        key={option.label} 
                        onClick={() => {
                            option.action();
                            handleMenuClose();
                        }}
                    >
                        {option.icon} 
                        <Typography variant="body1">{option.label}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}