import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar, InputBase, styled, Divider, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PetsIcon from '@mui/icons-material/Pets'; 
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const mockGrupoDetalhe = {
    id: 1,
    owner: 'maria',
    participants: ['Você', 'Ana', 'Beatriz', 'Igor'],
    queue: [
        { id: 1, title: 'Música 1', cover: '/assets/img/music_cover1.jpg' },
        { id: 2, title: 'Música 2', cover: '/assets/img/music_cover2.jpg' },
        { id: 3, title: 'Música 3', cover: '/assets/img/music_cover3.jpg' },
    ]
};

const LeaveButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-color)',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    '&:hover': { backgroundColor: 'var(--input-bg)' },
}));

const SearchInputWrapper = styled(Box)(({ theme }) => ({
    position: 'relative', flexGrow: 1, backgroundColor: 'var(--input-bg)', borderRadius: '25px',
    display: 'flex', alignItems: 'center', padding: '0 15px', height: '40px', transition: 'box-shadow 0.2s',
    '&:focus-within': { boxShadow: `0 0 0 1px var(--orange)` },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    flexGrow: 1, backgroundColor: 'transparent', border: 'none', padding: '12px 0',
    color: 'var(--text-color)', fontSize: '16px',
    '& input::placeholder': { color: 'var(--secondary-text-color)', opacity: 0.8 },
}));

const QueueItemBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'var(--card-bg)', borderRadius: '8px', padding: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
    transition: 'background-color 0.2s', cursor: 'pointer',
    '&:hover': { backgroundColor: 'var(--input-bg)' },
}));


function GrupoDetalhe() {
    const { id } = useParams();
    const grupo = mockGrupoDetalhe; 
    const isOwner = grupo.owner === 'maria'; 

    return (
        <main className="content-area">
            
            <Box className="header" sx={{ textAlign: 'right', marginBottom: '20px' }}>
                <LeaveButton variant="contained">Sair do Grupo</LeaveButton>
            </Box>

            <Box className="main-content" sx={{ 
                display: 'flex', 
                gap: '20px',
                flexDirection: { xs: 'column', sm: 'row' } 
            }}>
                
                <Box className="left-panel" sx={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '8px', flex: 2, display: 'flex', flexDirection: 'column' }}>
                    
                    <Box className="search-bar" sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        marginBottom: '20px', 
                        backgroundColor: 'var(--header-bg)',
                        padding: '10px 0', 
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        padding: { xs: '10px', sm: '10px 15px' },
                    }}>
                        
                        <Typography className="search-add" sx={{ 
                            color: 'var(--orange)', fontWeight: 'bold', 
                            paddingRight: '15px', 
                            whiteSpace: 'nowrap',
                            
                            borderRight: { xs: 'none', sm: '1px solid var(--border-color)' }, 
                            width: { xs: '100%', sm: 'auto' },
                            textAlign: { xs: 'center', sm: 'left' },
                            padding: { xs: '0 0 10px 0', sm: '0 15px 0 0' },
                            borderBottom: { xs: '1px solid var(--border-color)', sm: 'none' },
                        }}>
                            Adicionar Música
                        </Typography>
                        
                        <Box sx={{ 
                            display: 'flex', alignItems: 'center', flexGrow: 1, 
                            padding: { xs: '0', sm: '0 10px' },
                            width: '100%',
                        }}>
                            <SearchIcon sx={{ color: 'var(--secondary-text-color)', fontSize: '24px', cursor: 'pointer', mr: 1 }} />
                            <StyledInput placeholder="Pesquisar" fullWidth disableUnderline />
                        </Box>
                    </Box>

                    <Typography variant="h6" className="section-title" sx={{ marginBottom: '15px', color: 'var(--text-color)' }}>Fila</Typography>
                    
                    <List className="queue-list" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px', p: 0 }}>
                        {grupo.queue.map((item, index) => (
                            <QueueItemBox key={item.id}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                    <ListItemAvatar>
                                        <Avatar className="music-thumbnail" sx={{ width: 40, height: 40, borderRadius: '4px' }}>
                                            <img src={item.cover} alt="Capa" style={{ width: '100%', objectFit: 'cover' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.title} primaryTypographyProps={{ className: 'music-title', sx: { color: 'var(--text-color)', marginLeft: '10px', flexGrow: 1 } }} />
                                </Box>

                                <IconButton aria-label="Remover" sx={{ p: 0 }}>
                                    <CloseIcon sx={{ color: 'var(--secondary-text-color)' }} />
                                </IconButton>
                            </QueueItemBox>
                        ))}
                    </List>
                </Box>

                <Box className="right-panel" sx={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '8px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    <Box className="panel-section owner" sx={{ width: '100%', marginBottom: '20px' }}>
                        <Typography variant="subtitle1" className="section-subtitle" sx={{ marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '5px' }}>Dono(a)</Typography>
                        <Box className="owner-info" sx={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-color)' }}>
                            
                            <PetsIcon sx={{ 
                                color: 'var(--orange)',
                                fontSize: '20px' 
                            }} />
                            
                            <Typography className="owner-name" sx={{ fontWeight: 'bold' }}>{grupo.owner}</Typography>
                        </Box>
                    </Box>

                    <Box className="panel-section participants" sx={{ width: '100%', marginBottom: '20px' }}>
                        <Typography variant="subtitle1" className="section-subtitle" sx={{ marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '5px' }}>Participantes</Typography>
                        <List className="participants-list" sx={{ p: 0 }}>
                            {grupo.participants.map((p, index) => {
                                const isCurrentUser = p.toLowerCase() === 'você';
                                const textColor = isCurrentUser ? 'var(--orange)' : 'var(--text-color)';

                                return (
                                    <ListItem key={index} sx={{ p: 0, mb: 0.5, color: textColor }}>
                                        <PersonIcon sx={{ color: isCurrentUser ? 'var(--orange)' : 'var(--secondary-text-color)', fontSize: '15px', mr: 1 }} />
                                        
                                        <ListItemText 
                                            primary={p} 
                                            primaryTypographyProps={{ 
                                                fontSize: '15px',
                                                fontWeight: isCurrentUser ? 'bold' : 'normal',
                                                color: textColor
                                            }} 
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    
                    {isOwner && (
                        <Button variant="contained" className="settings-button" sx={{ 
                            backgroundColor: 'var(--orange)', color: 'var(--text-color)', 
                            padding: '10px 20px', borderRadius: '20px', 
                            marginTop: 'auto',
                            '&:hover': { backgroundColor: 'var(--darker-orange)' }
                        }}>
                            Configurações
                        </Button>
                    )}
                </Box>
            </Box>
        </main>
    );
}

export default GrupoDetalhe;