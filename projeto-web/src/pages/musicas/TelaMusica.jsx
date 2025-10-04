// TelaMusica.jsx (Adaptado para Redux)

import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Stack, 
    CardMedia, 
    Container,
    IconButton,
} from '@mui/material';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

// 1. Importações do Redux
import { useSelector } from 'react-redux'; 

import './css/TelaMusica.css';
import Comentarios from '../../components/Comentarios'; 

function TelaMusica() {
    // LER o estado da música atual do Redux
    const { currentSong } = useSelector(state => state.player); 

    // O objeto da música, usando currentSong ou um placeholder
    const musicaAtual = currentSong || {
        id: "default-song-placeholder", 
        // Corrigindo para usar 'title' e 'artist' conforme o musicas.json
        title: "Nenhuma Música Tocando", 
        artist: "Artista Desconhecido",
        cover: "/assets/img/vacamario.jpg", // 'cover' é o nome mais comum no seu JSON
        // Descrição e Letra serão undefined, mas evitam crashes.
        descricao: "Sem descrição.",
        letra: "Sem letra.",
    };
    
    // Usando 'cover' (se for o campo de imagem do seu JSON)
    const musicaImagem = musicaAtual.cover || musicaAtual.imagem; // Fallback para 'imagem' se houver
    const musicaTitulo = musicaAtual.title || musicaAtual.titulo; 
    const musicaArtista = musicaAtual.artist || musicaAtual.artista; 


    const [abaAtiva, setAbaAtiva] = useState('letra');

    // --- Lógica de Like/Dislike (Mantida como estado local) ---
    const [likes, setLikes] = useState(15);
    const [dislikes, setDislikes] = useState(3);
    const [userRating, setUserRating] = useState(0); 

    const handleLike = () => {
        if (userRating === 1) { 
            setLikes(likes - 1);
            setUserRating(0);
        } else if (userRating === -1) {
            setDislikes(dislikes - 1);
            setLikes(likes + 1);
            setUserRating(1);
        } else {
            setLikes(likes + 1);
            setUserRating(1);
        }
    };

    const handleDislike = () => {
        if (userRating === -1) { 
            setDislikes(dislikes - 1);
            setUserRating(0);
        } else if (userRating === 1) {
            setLikes(likes - 1);
            setDislikes(dislikes + 1);
            setUserRating(-1);
        } else {
            setDislikes(dislikes + 1);
            setUserRating(-1);
        }
    };
    // ------------------------------------

    return (
        <Container maxWidth="lg" className="tela-musica-container">
            {/* Bloco Esquerdo: Capa da Música e Nome */}
            <Box className="player-info-block">
                <Typography variant="h4" component="h1" gutterBottom className="musica-titulo">
                    {musicaTitulo}
                </Typography>
                <Typography variant="h6" gutterBottom className="musica-artista">
                    {musicaArtista}
                </Typography>

                <CardMedia
                    component="img"
                    image={musicaImagem}
                    alt={`Capa do álbum de ${musicaTitulo}`}
                    className="album-art"
                />

                {/* Botões de Like e Dislike */}
                <Stack direction="row" spacing={2} alignItems="center" className="like-dislike-buttons">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                            onClick={handleLike} 
                            aria-label="like"
                            sx={{ color: userRating === 1 ? '#ff7533' : 'white', '&:hover': { color: '#ff7533' } }}
                        >
                            <ThumbUpIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            {likes}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                            onClick={handleDislike} 
                            aria-label="dislike"
                            sx={{ color: userRating === -1 ? '#ff7533' : 'white', '&:hover': { color: '#ff7533' } }}
                        >
                            <ThumbDownIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            {dislikes}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {/* Bloco Direito: Opções */}
            <Box className="options-block">
                <Stack direction="row" spacing={1} className="options-buttons">
                    <Button 
                        variant={abaAtiva === 'artista' ? 'contained' : 'outlined'} 
                        onClick={() => setAbaAtiva('artista')}
                    >
                        Artista
                    </Button>
                    <Button 
                        variant={abaAtiva === 'descricao' ? 'contained' : 'outlined'} 
                        onClick={() => setAbaAtiva('descricao')}
                    >
                        Descrição
                    </Button>
                    <Button 
                        variant={abaAtiva === 'letra' ? 'contained' : 'outlined'} 
                        onClick={() => setAbaAtiva('letra')}
                    >
                        Letra
                    </Button>
                    <Button 
                        variant={abaAtiva === 'comentarios' ? 'contained' : 'outlined'} 
                        onClick={() => setAbaAtiva('comentarios')}
                    >
                        Comentários
                    </Button>
                </Stack>

                {/* Conteúdo dinâmico das abas */}
                <Box className="aba-content">
                    {abaAtiva === 'artista' && (<Typography>Conteúdo das Informações do {musicaArtista} aqui...</Typography>)}
                    {abaAtiva === 'descricao' && (<Typography>{musicaAtual.descricao || 'Descrição indisponível.'}</Typography>)}
                    {abaAtiva === 'letra' && (<Typography>{musicaAtual.letra || 'Letra indisponível.'}</Typography>)}
                    
                    {abaAtiva === 'comentarios' && (
                        <Comentarios musicaId={musicaId} />
                    )}
                </Box>
            </Box>
        </Container>
    );
}

export default TelaMusica;