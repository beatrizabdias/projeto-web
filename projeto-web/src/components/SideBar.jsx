import React from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material'; // Adicionado Tooltip
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; 
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 

// O SideButton agora é uma função auxiliar (Componente) que usa Tooltip
const SideButton = ({ children, to, label, isMobile, isProfile = false }) => {
    // Para mobile, renderizamos o label abaixo do ícone (mantido)
    if (isMobile) {
        return (
            <Link to={to} style={{ textDecoration: 'none', width: '100%' }}>
                <Box sx={{ 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'background-color 0.3s ease', 
                    padding: '0', width: '100%',
                }}>
                    <IconButton 
                        aria-label={label}
                        sx={{
                            backgroundColor: 'transparent', padding: '0', border: 'none', borderRadius: '0',
                            width: 'auto', height: 'auto', color: 'var(--icon-color)',
                            '&:hover': { backgroundColor: 'transparent', color: 'var(--orange)' },
                        }}
                    >
                        {children}
                    </IconButton>
                    <Typography variant="caption" sx={{ color: 'var(--secondary-text-color)', fontSize: '10px', paddingTop: '5px', textTransform: 'uppercase', fontWeight: 600 }}>
                        {label}
                    </Typography>
                </Box>
            </Link>
        );
    }

    // Para Desktop: Usamos o Tooltip com estilos personalizados
    return (
        <Tooltip 
            title={label} 
            placement="right" 
            arrow
            // ESTILOS CRÍTICOS PARA O TOOLTIP: Usa a propriedade componentsProps
            componentsProps={{
                tooltip: {
                    sx: {
                        // 1. Fundo Preto/Escuro
                        backgroundColor: '#1a1a1a', 
                        // 2. Aumentar Tamanho da Fonte
                        fontSize: '0.9rem', 
                        padding: '8px 12px',
                        // 3. Cor do texto (Branco)
                        color: 'var(--text-color)',
                        // 4. Sombra para destacar
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', 
                    },
                },
                arrow: {
                    sx: {
                        color: '#1a1a1a', // Cor da seta (deve combinar com o fundo)
                    },
                },
            }}
        >
            <Link to={to} style={{ textDecoration: 'none', width: '100%' }}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        transition: 'background-color 0.3s ease', 
                        padding: '5px 0', 
                        width: '100%',
                        marginTop: isProfile ? '10px' : '0', 
                    }}
                >
                    <IconButton 
                        aria-label={label}
                        sx={{
                            backgroundColor: 'var(--card-bg)', padding: '10px', border: 'none',
                            borderRadius: isProfile ? '50%' : '8px', 
                            width: '60px', height: '60px', color: 'var(--icon-color)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'var(--darker-orange, #333)', 
                                color: 'var(--orange)',
                            },
                        }}
                    >
                        {children}
                    </IconButton>
                </Box>
            </Link>
        </Tooltip>
    );
};


function SideBar({ isMobile = false }) {
// ... (restante do código do SideBar, que agora usa a função SideButton atualizada) ...
    return (
        <Box
            component="nav" 
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: isMobile ? 'space-around' : 'flex-start',
                width: isMobile ? '100%' : '80px',
                height: isMobile ? '60px' : '100%',
                backgroundColor: 'var(--sidebar-bg)',
                gap: isMobile ? '0' : '5px', 
                paddingTop: isMobile ? '0' : '70px',
                paddingBottom: isMobile ? '0' : '10px', 
            }}
            className={isMobile ? 'menu-rodape-mobile' : 'menu-lateral'}
        >
            <SideButton to="/" label="Início" isMobile={isMobile}>
                <HomeIcon sx={{ fontSize: isMobile ? '24px' : '28px' }} />
            </SideButton>

            <SideButton to="#fila" label="Fila" isMobile={isMobile}>
                <QueueMusicIcon sx={{ fontSize: isMobile ? '24px' : '28px' }} />
            </SideButton>
            
            <SideButton to="/playlists" label="Playlists" isMobile={isMobile}>
                <LibraryMusicIcon sx={{ fontSize: isMobile ? '24px' : '28px' }} />
            </SideButton>
            
            <SideButton to="/grupos" label="Grupos" isMobile={isMobile}>
                <GroupIcon sx={{ fontSize: isMobile ? '24px' : '28px' }} />
            </SideButton>
            
           
        </Box>
    );
}

export default SideBar;