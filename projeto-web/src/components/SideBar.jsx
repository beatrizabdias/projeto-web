import React, { useState } from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; 
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import GroupIcon from '@mui/icons-material/Group';

// Importa o componente da Fila (ajuste o caminho se necessário)
import QueueOverlay from '../components/Fila'; 

// -----------------------------------------------------------------
// 1. SideButton (Componente Auxiliar)
// Foi usado React.forwardRef para permitir que o QueueButton obtenha a posição do botão
// -----------------------------------------------------------------
const SideButton = React.forwardRef(({ children, to, label, isMobile, isProfile = false, ...props }, ref) => {
    
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

    // Versão Desktop
    return (
        <Tooltip 
            title={label} 
            placement="right" 
            arrow
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: '#1a1a1a', 
                        fontSize: '0.9rem', 
                        padding: '8px 12px',
                        color: 'var(--text-color)',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', 
                    },
                },
                arrow: {
                    sx: {
                        color: '#1a1a1a',
                    },
                },
            }}
        >
            <Link to={to} style={{ textDecoration: 'none', width: '100%' }}>
                <Box 
                    ref={ref} // Adicionado a referência aqui
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        transition: 'background-color 0.3s ease', 
                        padding: '5px 0', 
                        width: '100%',
                        marginTop: isProfile ? '10px' : '0', 
                    }}
                    {...props} // Permite passar eventos de hover
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
});


// -----------------------------------------------------------------
// 2. QueueButton (Componente de Overlay)
// Gerencia a visibilidade do overlay e o posicionamento de altura total
// -----------------------------------------------------------------
const QueueButton = ({ isVisible, setIsVisible }) => {
    const buttonRef = React.useRef(null);
    const [overlayTop, setOverlayTop] = useState(0);

    // Efeito para calcular a posição vertical do botão e alinhar o overlay
    React.useEffect(() => {
        if (buttonRef.current) {
            // Calcula a distância do topo da viewport
            const rect = buttonRef.current.getBoundingClientRect();
            setOverlayTop(rect.top);
        }
    }, [isVisible]);


    return (
        <Box
            sx={{
                position: 'relative', 
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <SideButton 
                to="/fila" 
                label="Fila" 
                isMobile={false}
                ref={buttonRef} 
            >
                <QueueMusicIcon sx={{ fontSize: '28px' }} />
            </SideButton>
            
            {/* O Overlay da Fila */}
            <Box
                sx={{
                    position: 'fixed', // Usa 'fixed' para grudar na tela, ignorando o scroll da página
                    top: overlayTop, // Início alinhado com o botão
                    left: '80px', // Posição após a sidebar (largura da sidebar)
                    zIndex: 1000,
                    
                    // Altura que se estende até o final da tela (100vh - o topo)
                    height: `calc(100vh - ${overlayTop}px)`, 
                    
                    opacity: isVisible ? 1 : 0,
                    visibility: isVisible ? 'visible' : 'hidden',
                    transition: 'opacity 0.3s ease, visibility 0.3s ease',
                    pointerEvents: isVisible ? 'auto' : 'none', // Permite interagir quando visível
                }}
            >
                <QueueOverlay />
            </Box>
        </Box>
    );
}


// -----------------------------------------------------------------
// 3. SideBar Principal
// -----------------------------------------------------------------
function SideBar({ isMobile = false }) {
    const [isQueueVisible, setIsQueueVisible] = useState(false);

    // Versão Mobile
    if (isMobile) {
        return (
            <Box
                component="nav" 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    height: '60px',
                    backgroundColor: 'var(--sidebar-bg)',
                    gap: '0', 
                    paddingTop: '0',
                    paddingBottom: '0', 
                }}
                className={'menu-rodape-mobile'}
            >
                <SideButton to="/" label="Início" isMobile={true}>
                    <HomeIcon sx={{ fontSize: '24px' }} />
                </SideButton>

                {/* Botão Fila para mobile continua sendo um Link */}
                <SideButton to="/fila" label="Fila" isMobile={true}>
                    <QueueMusicIcon sx={{ fontSize: '24px' }} />
                </SideButton>
                
                <SideButton to="/playlists" label="Playlists" isMobile={true}>
                    <LibraryMusicIcon sx={{ fontSize: '24px' }} />
                </SideButton>
                
                <SideButton to="/grupos" label="Grupos" isMobile={true}>
                    <GroupIcon sx={{ fontSize: '24px' }} />
                </SideButton>
            </Box>
        );
    }
    
    // Versão Desktop
    return (
        <Box
            component="nav" 
            sx={{
                position: 'fixed', // Fixo para que o overlay use a viewport
                top: 0,
                left: 0,
                // Largura e altura da SideBar
                width: '80px', 
                height: '100vh', // Ocupa a altura total da viewport
                backgroundColor: 'var(--sidebar-bg)',
                zIndex: 100, // Z-index alto para ficar acima do conteúdo
                
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '5px', 
                paddingTop: '70px',
                paddingBottom: '10px', 
            }}
            className={'menu-lateral'}
        >
            <SideButton to="/" label="Início" isMobile={false}>
                <HomeIcon sx={{ fontSize: '28px' }} />
            </SideButton>

            {/* O componente QueueButton que lida com o hover e o overlay */}
            <QueueButton 
                isVisible={isQueueVisible} 
                setIsVisible={setIsQueueVisible} 
            />
            
            <SideButton to="/playlists" label="Playlists" isMobile={false}>
                <LibraryMusicIcon sx={{ fontSize: '28px' }} />
            </SideButton>
            
            <SideButton to="/grupos" label="Grupos" isMobile={false}>
                <GroupIcon sx={{ fontSize: '28px' }} />
            </SideButton>
        </Box>
    );
}

export default SideBar;