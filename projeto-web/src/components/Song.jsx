import React, { useState } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';

const COR_LARANJA = 'var(--orange)'; 

export default function Song({ title, duration }) {

    const [estaCurtida, setEstaCurtida] = useState(false);
    
    const [anchorEl, setAnchorEl] = useState(null);
    const aberto = Boolean(anchorEl);

    const handleCurtidaClick = (e) => {
        e.stopPropagation();
        setEstaCurtida(!estaCurtida);
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
        { icon: <PersonIcon fontSize="small" />, label: 'Ir para o artista', action: () => console.log(`Ir para o artista`) },
        { icon: <ShareIcon fontSize="small" />, label: 'Compartilhar', action: () => console.log(`Compartilhar ${title}`) },
    ];
    
   
    const corIcone = estaCurtida ? COR_LARANJA : 'var(--secondary-text-color)';
    

    return (
        <>
            <div className="song flex">
                <div className="song-detail flex">
                    <i className="play-icon fa-solid fa-play"></i>
                    <div className="song-info flex">
                        <span className="song-title">{title}</span>
                        <span className="song-artist">Artista Famoso</span>
                    </div>
                </div>
                <div className="song-detail flex">
                   
                    <div 
                        className="icon" 
                        onClick={handleCurtidaClick}
                        style={{ cursor: 'pointer', color: corIcone }}
                    >
                        {estaCurtida ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    </div>


                    <span className="song-duration">{duration}</span>
                    
                    <i 
                        className="icon fa-solid fa-ellipsis"
                        onClick={handleMenuClick}
                        aria-controls={aberto ? 'song-options-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={aberto ? 'true' : undefined}
                        style={{ cursor: 'pointer', color: 'var(--secondary-text-color)' }}
                    ></i>
                </div>
            </div>
            
            <Menu
                id="song-options-menu"
                anchorEl={anchorEl}
                open={aberto}
                onClose={handleMenuClose}
                MenuListProps={{
                    sx: { bgcolor: 'var(--header-bg)', color: 'var(--text-color)' }
                }}
            >
                {menuOptions.map((option) => (
                    <MenuItem 
                        key={option.label} 
                        onClick={() => {
                            option.action();
                            handleMenuClose();
                        }}
                        sx={{ 
                            display: 'flex', 
                            gap: 1, 
                            py: 1,
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } 
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