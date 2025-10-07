import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    TextField, 
    TextareaAutosize, 
    InputBase, 
    Container, 
    styled, 
    Divider,
    Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const mockGrupos = [
    { id: 1, name: "Teste", currentSong: "Musica 1", members: "igor, ana e mais 5", status: "Ao vivo", cover: "/assets/img/vacateste.jpg" },
    { id: 2, name: "Grupo legal 123", currentSong: "Musica 1", members: "ana, beatriz e mais 12", status: "Ao vivo", cover: "/assets/img/vacateste.jpg" },
    { id: 3, name: "Grupo legal", currentSong: "Música 2", members: "maria, beatriz e mais 4", status: "Ao vivo", cover: "/assets/img/vacateste.jpg" },
];

const GruposContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
}));

const GrupoCard = styled(Box)(({ theme, isNew = false }) => ({
    background: isNew ? 'var(--border-color)' : 'var(--header-bg)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: isNew ? 'none' : '0 4px 15px rgba(0,0,0,0.5)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
    position: 'relative',
    height: isNew ? 'auto' : '100%',
    
    ...(isNew && {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '30px 15px',
        border: '2px dashed #444',
        cursor: 'pointer',
        '&:hover': {
            borderColor: 'var(--orange)',
            boxShadow: '0 0 10px rgba(255, 107, 0, 0.3)',
            transform: 'none',
        },
    }),
    
    ...(!isNew && {
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.7)',
        },
    }),
}));

const GrupoItem = ({ grupo }) => (
    <Link to={`/grupos/${grupo.id}`} style={{ textDecoration: 'none' }}>
        <GrupoCard>
            <Box className="img-cima" sx={{ position: 'relative' }}>
                <img src={grupo.cover} alt={`Capa do grupo ${grupo.name}`} style={{ width: '100%', height: '150px', objectFit: 'cover', filter: 'brightness(70%)' }} />
                <Typography variant="caption" className="grupo-status" sx={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0, 0, 0, 0.6)', color: 'var(--text-color)', padding: '5px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center' }}>
                    <HeadphonesIcon sx={{ color: 'var(--orange)', fontSize: '14px', mr: 0.5 }} /> {grupo.status}
                </Typography>
            </Box>
            <Box className="conteudo-baixo" sx={{ padding: '15px' }}>
                <Typography variant="h6" component="h3" sx={{ margin: 0, fontSize: '20px', color: 'var(--text-color)' }}>
                    {grupo.name}
                </Typography>
                <Box className="info-musica" sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-color)', fontSize: '14px', margin: '8px 0', overflow: 'hidden' }}>
                    <MusicNoteIcon sx={{ color: 'var(--orange)', fontSize: '14px' }} />
                    Tocando: {grupo.currentSong}
                </Box>
                <Typography variant="body2" className="info-integrantes" sx={{ fontSize: '13px', color: '#999', marginBottom: '15px' }}>
                    Integrantes: {grupo.members}
                </Typography>
                <Button variant="contained" className="btn-entrar" sx={{ 
                    width: '100%', padding: '12px', borderRadius: '8px',
                    backgroundColor: 'var(--orange)', color: 'white', fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'var(--darker-orange)' }
                }}>
                    Entrar no grupo
                </Button>
            </Box>
        </GrupoCard>
    </Link>
);


function Grupos() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    return (
        <main className="content-area">
            <Box sx={{ display: isFormVisible ? 'none' : 'block' }}>

                <Box className="meus-grupos">
                    <Typography variant="h5" component="h2" sx={{ marginBottom: '15px', color: 'var(--secondary-text-color)' }}>
                        Meus Grupos
                    </Typography>
                    <GruposContainer>
                        <GrupoCard isNew onClick={() => setIsFormVisible(true)}>
                            <AddCircleIcon className="icone-add" sx={{ fontSize: '40px', color: 'var(--orange)', marginBottom: '10px' }} />
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Criar novo grupo</Typography>
                        </GrupoCard>

                        {mockGrupos.slice(0, 1).map((grupo) => (
                            <GrupoItem key={grupo.id} grupo={grupo} />
                        ))}
                    </GruposContainer>
                </Box>

                <Divider sx={{ my: 4, borderColor: 'var(--border-color)' }} /> 

                <Box className="grupos-destaque">
                    <Typography variant="h5" component="h2" sx={{ marginBottom: '15px', color: 'var(--secondary-text-color)' }}>
                        Grupos em Destaque
                    </Typography>
                    <GruposContainer>
                        {mockGrupos.map((grupo) => (
                            <GrupoItem key={grupo.id} grupo={grupo} />
                        ))}
                    </GruposContainer>
                </Box>
            </Box>


            <Box className="form-grupo" sx={{ display: isFormVisible ? 'block' : 'none', maxWidth: '500px', margin: '0 auto', padding: '20px', background: 'var(--card-bg)', borderRadius: '12px' }}>
                <Typography variant="h5" component="h2" sx={{ marginBottom: '20px' }}>
                    Criar novo grupo
                </Typography>
                <form>
                    <Typography component="label" htmlFor="nome-grupo" sx={{ display: 'block', mt: 2 }}>Nome do Grupo</Typography>
                    <TextField fullWidth id="nome-grupo" placeholder="Ex: Grupo da Galera" variant="outlined" sx={{ mb: 2, '& input': { color: 'var(--text-color)' }, '& fieldset': { borderColor: 'var(--border-color)' } }} />

                    <Typography component="label" htmlFor="descricao-grupo" sx={{ display: 'block' }}>Descrição</Typography>
                    <TextareaAutosize minRows={3} id="descricao-grupo" style={{ width: '100%', marginBottom: '20px', padding: '10px', backgroundColor: 'var(--input-bg)', color: 'var(--text-color)', border: `1px solid var(--border-color)`, borderRadius: '4px' }} />

                    <Typography component="label" htmlFor="imagem-grupo" sx={{ display: 'block' }}>Imagem de Capa</Typography>
                    <Box className="upload-container" sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: 3 }}>
                        <Typography variant="body2" className="file-name">Nenhum arquivo selecionado</Typography>
                        <Button component="label" variant="contained" className="btn-upload" sx={{ backgroundColor: 'var(--orange)', '&:hover': { backgroundColor: 'var(--darker-orange)' } }}>
                            Escolher arquivo
                            <input type="file" hidden id="imagem-grupo" accept="image/*" />
                        </Button>
                    </Box>

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" className="btn-cancelar" onClick={() => setIsFormVisible(false)} sx={{ color: 'var(--text-color)', borderColor: 'var(--border-color)' }}>Cancelar</Button>
                        <Button type="submit" variant="contained" className="btn-criar" sx={{ backgroundColor: 'var(--orange)', '&:hover': { backgroundColor: 'var(--darker-orange)' } }}>Criar</Button>
                    </Stack>
                </form>
            </Box>
        </main>
    );
}

export default Grupos;