import React, { useState } from 'react';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; 

// Componente Player existente
import Player from './Player'; 
// Importação do contexto do player (NECESSÁRIO para o MiniPlayer)
import { useMusicPlayer } from '../context/MusicPlayerContext'; 

// Ícones de Navegação existentes
import HomeIcon from '@mui/icons-material/Home'; 
import QueueMusicIcon from '@mui/icons-material/QueueMusic'; 
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import GroupIcon from '@mui/icons-material/Group'; 

// NOVOS ÍCONES de controle e visibilidade
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

// Constantes de estilo existentes
const ACTIVE_COLOR = 'var(--orange)';
const INACTIVE_COLOR = 'var(--secondary-text-color)';


// ------------------------------------------------------------------
// COMPONENTE AUXILIAR: MobileMenuItem (Inalterado)
// ------------------------------------------------------------------

const MobileMenuItem = ({ item, isActive }) => (
    <Link to={item.to} style={{ textDecoration: 'none', flexGrow: 1 }}>
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                transition: 'background-color 0.3s ease',
            }}
        >
            <IconButton 
                aria-label={item.label}
                sx={{
                    color: isActive ? ACTIVE_COLOR : 'var(--icon-color)',
                    padding: 0,
                    '&:hover': { backgroundColor: 'transparent', color: ACTIVE_COLOR },
                }}
            >
                <item.Icon sx={{ fontSize: '24px' }} />
            </IconButton>
            <Typography 
                variant="caption" 
                sx={{ 
                    color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                    fontSize: '10px', 
                    paddingTop: '3px', 
                    textTransform: 'uppercase', 
                    fontWeight: 600,
                }}
            >
                {item.label}
            </Typography>
        </Box>
    </Link>
);

// ------------------------------------------------------------------
// NOVO COMPONENTE: MINI PLAYER 
// ------------------------------------------------------------------

const MiniPlayerTabContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 20, 
    right: 20,
    width: 'auto', 
    minWidth: '150px',
    height: '60px',
    borderRadius: '30px', 
    backgroundColor: 'var(--orange, #ff7533)', 
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px 0 15px', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
    zIndex: 1003,
    [theme.breakpoints.up('sm')]: {
        right: 40, 
        bottom: 40,
    },
}));

const MiniPlayerTab = ({ onShowFooter }) => {
    // APENAS LENDO o estado e as funções do player. Não há auto-play aqui.
    const { isPlaying, togglePlayPause, skipNext, currentSong } = useMusicPlayer(); 
    const musicaAtual = currentSong || { titulo: "Música Não Selecionada" };

    return (
        <MiniPlayerTabContainer>
            <Typography 
                variant="body2" 
                sx={{ 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    maxWidth: '100px',
                    fontWeight: 'bold',
                }}
            >
                {musicaAtual.titulo}
            </Typography>

            <IconButton 
                onClick={togglePlayPause} // Chamado apenas ao clicar
                sx={{ color: 'white', ml: 1, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <IconButton 
                onClick={skipNext} // Chamado apenas ao clicar
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}
                aria-label="Avançar"
            >
                <SkipNextIcon />
            </IconButton>

            <IconButton 
                onClick={onShowFooter}
                aria-label="Mostrar Rodapé Completo"
                sx={{ 
                    color: 'white', 
                    ml: 0.5,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.3)' } 
                }}
            >
                <KeyboardArrowUpIcon />
            </IconButton>
        </MiniPlayerTabContainer>
    );
};


// ------------------------------------------------------------------
// COMPONENTE PRINCIPAL: FOOTER 
// ------------------------------------------------------------------

import TelaMusica from '../pages/musicas/TelaMusica'; 
function Footer() {
    const location = useLocation(); 

    // Se estiver na rota de detalhe da música (Mobile/Fullscreen), não mostra o footer
    if (location.pathname.startsWith(MUSIC_DETAIL_PATH)) { 
        return null;
    }

    return (
        <footer 
            style={{ 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                width: '100%', 
                zIndex: 1001,
            }}
        >
            {/* Player e Copyright (Desktop) */}
            <Box sx={{ 
                display: { xs: 'none', sm: 'flex' }, 
                flexDirection: 'column',
                width: '100%', 
                backgroundColor: 'var(--footer-bg)', 
            }}>
                <Player /> 
                <div className="foo">
                    <p>&copy; 2025 Moosica. Todos os direitos reservados.</p>
                </div>
            </Box>

            {/* Player e Footer Consolidado (Mobile) */}
            <Box sx={{ 
                display: { xs: 'flex', sm: 'none' }, 
                flexDirection: 'column', 
                width: '100%',
                paddingBottom: '60px', // Espaço para o Menu Mobile
                backgroundColor: 'var(--footer-bg)', 
            }}>
                <Player />
                <div className="foo" style={{ padding: '5px' }}>
                    <p>&copy; 2025 Moosica.</p>
                </div>
            </Box>


            {/* MENU RODAPÉ MOBILE */}
            <Box
                className="menu-rodape-mobile"
                component="nav"
                sx={{
                    display: { xs: 'flex', md: 'none' }, 
                    position: 'fixed',
                    bottom: 0, 
                    left: 0,
                    width: '100%',
                    height: '60px', 
                    zIndex: 1002, 
                    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
                    backgroundColor: 'var(--sidebar-bg)', 
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: '0', 
                }}
            >
                {mobileMenuItems.map((item) => {
                    const isActive = location.pathname === item.to || 
                                     (item.to !== '/' && location.pathname.startsWith(item.to));

                    return (
                        <MobileMenuItem 
                            key={item.label} 
                            item={item} 
                            isActive={isActive} 
                        />
                    );
                })}
            </Box>
        </footer>
    );
}

export default Footer;