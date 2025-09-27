// src/pages/musicas/TelaMusica.jsx

import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Stack, 
    CardMedia, 
    Container 
} from '@mui/material';

import './css/TelaMusica.css';
import { useMusicPlayer } from '../../context/MusicPlayerContext';
import Player from '../../components/Player'; 

function TelaMusica() {
    const { currentSong } = useMusicPlayer(); 
    
    const musicaAtual = currentSong || {
        titulo: "Nenhuma Música Tocando",
        artista: "Artista Desconhecido",
        albumArt: "/assets/img/default_cover.jpg",
    };

    const [abaAtiva, setAbaAtiva] = useState('letra');

    return (
        <Container maxWidth="lg" className="tela-musica-container">
            {/* Bloco Esquerdo: Capa da Música e Nome */}
            <Box className="player-info-block">
                <Typography variant="h4" component="h1" gutterBottom className="musica-titulo">
                    {musicaAtual.titulo}
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom className="musica-artista">
                    {musicaAtual.artista}
                </Typography>
                
                {/* Imagem da Capa */}
                <CardMedia
                    component="img"
                    image={musicaAtual.albumArt}
                    alt={`Capa do álbum de ${musicaAtual.titulo}`}
                    className="album-art"
                />
                
                {/* 💥 ALTERAÇÃO AQUI: Adiciona o Player na TelaMusica */}
                <Box sx={{ width: '100%', mt: 3, mb: 3 }}>
                    <Player />
                </Box>
                {/* O Player agora aparece aqui */}
            </Box>

            {/* Bloco Direito: Opções (Artista, Descrição, Letra) */}
            <Box className="options-block">
                {/* ... (Conteúdo das abas inalterado) ... */}
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
                </Stack>

                {/* Conteúdo dinâmico das abas */}
                <Box className="aba-content">
                    {/* ... (Conteúdo das abas inalterado) ... */}
                    {abaAtiva === 'artista' && (<Typography>Conteúdo das Informações do Artista aqui...</Typography>)}
                    {abaAtiva === 'descricao' && (<Typography>Conteúdo da Descrição da Música aqui...</Typography>)}
                    {abaAtiva === 'letra' && (<Typography>Conteúdo da Letra da Música aqui...</Typography>)}
                </Box>
            </Box>
        </Container>
    );
}

export default TelaMusica;