import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; 

import Player from './Player'; 

import HomeIcon from '@mui/icons-material/Home'; 
import QueueMusicIcon from '@mui/icons-material/QueueMusic'; 
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import GroupIcon from '@mui/icons-material/Group'; 


const mobileMenuItems = [
    { to: '/', label: 'Início', Icon: HomeIcon },
    { to: '/fila', label: 'Fila', Icon: QueueMusicIcon },
    { to: '/playlists', label: 'Playlists', Icon: LibraryMusicIcon },
    { to: '/grupos', label: 'Grupos', Icon: GroupIcon },
];

const ACTIVE_COLOR = 'var(--orange)';
const INACTIVE_COLOR = 'var(--secondary-text-color)';
const MUSIC_DETAIL_PATH = '/musica/'; 


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

function Footer() {
    const location = useLocation(); 

    // Define se estamos na rota de detalhe da música.
    const isMusicDetailRoute = location.pathname.startsWith(MUSIC_DETAIL_PATH); 
    
    // REMOVIDO: Toda a lógica do MiniPlayer e o estado isFooterVisible.

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
            {/* Visível em desktop em TODAS AS TELAS */}
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
            {/* Visível em mobile em TODAS AS TELAS (Mesmo na TelaMusica) */}
            <Box sx={{ 
                display: { xs: 'flex', sm: 'none' }, 
                flexDirection: 'column', 
                width: '100%',
                // O paddingBottom é 0 se estiver na TelaMusica (sem menu mobile)
                paddingBottom: isMusicDetailRoute ? '0' : '60px', 
                backgroundColor: 'var(--footer-bg)', 
            }}>
                <Player />
                <div className="foo" style={{ padding: '5px' }}>
                    <p>&copy; 2025 Moosica.</p>
                </div>
            </Box>


            {/* MENU RODAPÉ MOBILE (Fixo, mas escondido na tela de música) */}
            <Box
                className="menu-rodape-mobile"
                component="nav"
                sx={{
                    // CRÍTICO: Esconde o menu mobile se estiver na tela de detalhe da música
                    display: isMusicDetailRoute ? 'none' : { xs: 'flex', md: 'none' }, 
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