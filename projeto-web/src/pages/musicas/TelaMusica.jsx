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

import './css/TelaMusica.css';
import { useMusicPlayer } from '../../context/MusicPlayerContext';
import Comentarios from '../../components/Comentarios'; 

function TelaMusica() {
    const { currentSong } = useMusicPlayer(); 

    // ADICIONADO: Um ID único para a música (essencial para comentários persistentes)
    const musicaAtual = currentSong || {
        id: "default-song-placeholder", // ID único
        titulo: "Nenhuma Música Tocando",
        artista: "Artista Desconhecido",
        imagem: "/assets/img/vacamario.jpg",
    };

    const [abaAtiva, setAbaAtiva] = useState('letra');

    // --- NOVO: Lógica de Like/Dislike ---
    const [likes, setLikes] = useState(15);
    const [dislikes, setDislikes] = useState(3);
    // userRating: 1 (Like), -1 (Dislike), 0 (Nenhum)
    const [userRating, setUserRating] = useState(0); 

    const handleLike = () => {
        if (userRating === 1) { // Já deu like -> Desfazer
            setLikes(likes - 1);
            setUserRating(0);
        } else if (userRating === -1) { // Deu dislike -> Trocar para like
            setDislikes(dislikes - 1);
            setLikes(likes + 1);
            setUserRating(1);
        } else { // Não avaliou -> Dar like
            setLikes(likes + 1);
            setUserRating(1);
        }
    };

    const handleDislike = () => {
        if (userRating === -1) { // Já deu dislike -> Desfazer
            setDislikes(dislikes - 1);
            setUserRating(0);
        } else if (userRating === 1) { // Deu like -> Trocar para dislike
            setLikes(likes - 1);
            setDislikes(dislikes + 1);
            setUserRating(-1);
        } else { // Não avaliou -> Dar dislike
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
                    {musicaAtual.titulo}
                </Typography>
                <Typography variant="h6" gutterBottom className="musica-artista">
                    {musicaAtual.artista}
                </Typography>

                <CardMedia
                    component="img"
                    image={musicaAtual.imagem}
                    alt={`Capa do álbum de ${musicaAtual.titulo}`}
                    className="album-art"
                />

                {/* NOVO: Botões de Like e Dislike */}
                <Stack direction="row" spacing={2} alignItems="center" className="like-dislike-buttons">
                    {/* Botão de Like */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                            onClick={handleLike} 
                            aria-label="like"
                            // Cor condicional: laranja quando ativo, branco/padrão quando inativo
                            sx={{ color: userRating === 1 ? '#ff7533' : 'white', '&:hover': { color: '#ff7533' } }}
                        >
                            <ThumbUpIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            {likes}
                        </Typography>
                    </Box>

                    {/* Botão de Dislike */}
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
                {/* Fim dos Botões de Like e Dislike */}

            </Box>

            {/* Bloco Direito: Opções (Artista, Descrição, Letra, Comentários) */}
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
                    {/* NOVA ABA: Comentários */}
                    <Button 
                        variant={abaAtiva === 'comentarios' ? 'contained' : 'outlined'} 
                        onClick={() => setAbaAtiva('comentarios')}
                    >
                        Comentários
                    </Button>
                </Stack>

                {/* Conteúdo dinâmico das abas */}
                <Box className="aba-content">
                    {abaAtiva === 'artista' && (<Typography>Conteúdo das Informações do {musicaAtual.artista} aqui...</Typography>)}
                    {abaAtiva === 'descricao' && (<Typography>{musicaAtual.descricao}</Typography>)}
                    {abaAtiva === 'letra' && (<Typography>{musicaAtual.letra}</Typography>)}
                    
                    {/* NOVO CONTEÚDO: Componente de Comentários */}
                    {abaAtiva === 'comentarios' && (
                        <Comentarios musicaId={musicaAtual.id} />
                    )}
                </Box>
            </Box>
        </Container>
    );
}

export default TelaMusica;