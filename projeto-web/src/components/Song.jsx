import React, { useState } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';
import AlbumIcon from '@mui/icons-material/Album';
import QueueIcon from '@mui/icons-material/Queue';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLikeSongAsync } from '../redux/loginSlice';

const COR_LARANJA = 'var(--orange)'; 

export default function Song({ song }) {
    const { title, duration = "3:20", artist, artistId, id: songId } = song;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);
    const isLiked = user?.likedSongs?.includes(songId);

    const [anchorEl, setAnchorEl] = useState(null);
    const aberto = Boolean(anchorEl);

    const handleLikeClick = (e) => {
         console.log("USUÁRIO ATUAL NO REDUX:", user);
        if (user) {
            dispatch(toggleLikeSongAsync({
                userId: user.id,
                songId: songId,
                currentLikedSongs: user.likedSongs || [],
            }));
        } else {
            console.log("Faça login para curtir músicas!");
            navigate('/login');
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
                    <i className="play-icon fa-solid fa-play"></i>
                    <div className="song-info flex">
                        <span className="song-title">{title}</span>
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