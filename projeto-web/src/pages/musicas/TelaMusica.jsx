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


function TelaMusica() {
    const { currentSong } = useMusicPlayer(); 
    
    // CRÍTICO: Usamos 'imagem' como a propriedade principal para a capa
    const DEFAULT_ALBUM_ART = "/assets/img/vacamario.jpg";

    const musicaAtual = currentSong || {
        titulo: "Nenhuma Música Tocando",
        artista: "Artista Desconhecido",
        // USANDO O CAMPO 'imagem' AQUI TAMBÉM
        imagem: DEFAULT_ALBUM_ART,
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
                    // CRÍTICO: Mudando a propriedade de 'image' para 'musicaAtual.imagem'
                    image={musicaAtual.imagem} 
                    alt={`Capa do álbum de ${musicaAtual.titulo}`}
                    className="album-art"
                />
                
                {/* O Player NÃO está mais aqui, ele fica no Footer */}
            </Box>

            {/* Bloco Direito: Opções (Artista, Descrição, Letra) */}
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
                </Stack>

                {/* Conteúdo dinâmico das abas */}
                <Box className="aba-content">
                    {abaAtiva === 'artista' && (<Typography>Conteúdo das Informações do Artista aqui...</Typography>)}
                    {abaAtiva === 'descricao' && (<Typography>Conteúdo da Descrição da Música aqui...</Typography>)}
                    {abaAtiva === 'letra' && (<Typography>Conteúdo da Letra da Música aqui...</Typography>)}
                </Box>
            </Box>
        </Container>
    );
}

export default TelaMusica;