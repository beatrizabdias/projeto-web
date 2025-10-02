import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar, InputBase, styled, Divider, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PetsIcon from '@mui/icons-material/Pets'; 
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // Ícone de música

// --- Dados Mock de Exemplo (Mantido) ---
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

// --- Componentes Estilizados (Mantido) ---
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
            
            {/* Cabeçalho da Página: Botão Sair */}
            <Box className="header" sx={{ textAlign: 'right', marginBottom: '20px' }}>
                <LeaveButton variant="contained">Sair do Grupo</LeaveButton>
            </Box>

            {/* CRÍTICO: Conteúdo Principal - LAYOUT RESPONSIVO */}
            <Box className="main-content" sx={{ 
                display: 'flex', 
                gap: '20px',
                // ESTILO MOBILE: Stack vertical (coluna) em telas menores que 'sm' (600px)
                flexDirection: { xs: 'column', sm: 'row' } 
            }}>
                
                {/* Painel Esquerdo: Busca e Fila */}
                <Box className="left-panel" sx={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '8px', flex: 2, display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Barra de Busca e Adicionar (CONTROLES INTERNOS) */}
                    <Box className="search-bar" sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        marginBottom: '20px', 
                        backgroundColor: 'var(--header-bg)',
                        padding: '10px 0', 
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        
                        // CRÍTICO: Layout Mobile da Barra (Label em cima, Input em baixo)
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        padding: { xs: '10px', sm: '10px 15px' },
                    }}>
                        
                        {/* 1. Label de Adicionar Música */}
                        <Typography className="search-add" sx={{ 
                            color: 'var(--orange)', fontWeight: 'bold', 
                            paddingRight: '15px', 
                            whiteSpace: 'nowrap',
                            
                            // Estilo Desktop: Divisória vertical
                            borderRight: { xs: 'none', sm: '1px solid var(--border-color)' }, 
                            // Estilo Mobile: Divisória horizontal (e ocupa 100%)
                            width: { xs: '100%', sm: 'auto' },
                            textAlign: { xs: 'center', sm: 'left' },
                            padding: { xs: '0 0 10px 0', sm: '0 15px 0 0' },
                            borderBottom: { xs: '1px solid var(--border-color)', sm: 'none' },
                        }}>
                            Adicionar Música
                        </Typography>
                        
                        {/* 2. Wrapper do Campo de Busca */}
                        <Box sx={{ 
                            display: 'flex', alignItems: 'center', flexGrow: 1, 
                            padding: { xs: '0', sm: '0 10px' },
                            width: '100%', // Ocupa 100% da largura do pai (necessário no mobile)
                        }}>
                            <SearchIcon sx={{ color: 'var(--secondary-text-color)', fontSize: '24px', cursor: 'pointer', mr: 1 }} />
                            <StyledInput placeholder="Pesquisar" fullWidth disableUnderline />
                        </Box>
                    </Box>

                    <Typography variant="h6" className="section-title" sx={{ marginBottom: '15px', color: 'var(--text-color)' }}>Fila</Typography>
                    
                    {/* Lista de Músicas na Fila */}
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

                {/* Painel Direito: Participantes e Configurações */}
                <Box className="right-panel" sx={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '8px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    {/* Dono do Grupo */}
                    <Box className="panel-section owner" sx={{ width: '100%', marginBottom: '20px' }}>
                        <Typography variant="subtitle1" className="section-subtitle" sx={{ marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '5px' }}>Dono(a)</Typography>
                        <Box className="owner-info" sx={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-color)' }}>
                            
                            {/* ÍCONE DE VACA LARANJA (PetsIcon ou outro) */}
                            <PetsIcon sx={{ 
                                color: 'var(--orange)', // Cor laranja do seu tema
                                fontSize: '20px' 
                            }} />
                            
                            <Typography className="owner-name" sx={{ fontWeight: 'bold' }}>{grupo.owner}</Typography>
                        </Box>
                    </Box>

                     {/* Participantes */}
                <Box className="panel-section participants" sx={{ width: '100%', marginBottom: '20px' }}>
                    <Typography variant="subtitle1" className="section-subtitle" sx={{ marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '5px' }}>Participantes</Typography>
                    <List className="participants-list" sx={{ p: 0 }}>
                        {grupo.participants.map((p, index) => {
                            // CRÍTICO: Verifica se o participante é o usuário atual (você)
                            const isCurrentUser = p.toLowerCase() === 'você';
                            const textColor = isCurrentUser ? 'var(--orange)' : 'var(--text-color)';

                            return (
                                <ListItem key={index} sx={{ p: 0, mb: 0.5, color: textColor }}>
                                    {/* Ícone de pessoa (participante) */}
                                    <PersonIcon sx={{ color: isCurrentUser ? 'var(--orange)' : 'var(--secondary-text-color)', fontSize: '15px', mr: 1 }} />
                                    
                                    {/* Nome do Participante */}
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
                    
                    {/* Botão de Configurações (Apenas para o Dono) */}
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