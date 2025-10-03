import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVote } from '../../redux/votesSlice'; 

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
import BarraLikes from '../../components/BarraLikes';

function TelaMusica() {
    const { currentSong } = useMusicPlayer(); 
    
    const musicaId = currentSong ? currentSong.id : "default-song-placeholder";

    const musicaAtual = currentSong || {
        id: musicaId, 
        titulo: "Nenhuma Música Tocando",
        artista: "Artista Desconhecido",
        imagem: "/assets/img/vacamario.jpg",
    };

    const [abaAtiva, setAbaAtiva] = useState('letra');

    const dispatch = useDispatch();
    
    // Busca os dados de votação desta música no estado global
    const { likes, dislikes, userRating } = useSelector(state => 
        state.votes[musicaId] || { likes: 0, dislikes: 0, userRating: 0 }
    );

    const handleLike = () => {
        dispatch(toggleVote({ musicaId, voteType: 'like' }));
    };

    const handleDislike = () => {
        dispatch(toggleVote({ musicaId, voteType: 'dislike' }));
    };

    const totalVotes = likes + dislikes;
    let likePercentage = 0;

    if (totalVotes > 0) {
        // Calcula a porcentagem e limita a duas casas decimais
        likePercentage = (likes / totalVotes) * 100;
    }
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

                {/* Container para os Botões e a Barra (para que a barra fique abaixo de ambos) */}
                <Box sx={{ width: '100%', maxWidth: '300px', mx: 'auto' }}> 
                    
                    {/* Botões de Like e Dislike */}
                    <Stack direction="row" spacing={2} alignItems="center" className="like-dislike-buttons">
                        {/* Botão de Like */}
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

                    <BarraLikes likePercentage={likePercentage} /> 
                    
                </Box>

            </Box>

            {/* Bloco Direito: Opções (Artista, Descrição, Letra, Comentários) */}
            <Box className="options-block">
                {/* ... (Conteúdo das abas, inalterado) ... */}
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
                    {abaAtiva === 'artista' && (<Typography>Conteúdo das Informações do {musicaAtual.artista} aqui...</Typography>)}
                    {abaAtiva === 'descricao' && (<Typography>{musicaAtual.descricao}</Typography>)}
                    {abaAtiva === 'letra' && (<Typography>{musicaAtual.letra}</Typography>)}
                    
                    {/* CONTEÚDO: Componente de Comentários */}
                    {abaAtiva === 'comentarios' && (
                        <Comentarios musicaId={musicaAtual.id} />
                    )}
                </Box>
            </Box>
        </Container>
    );
}

export default TelaMusica;