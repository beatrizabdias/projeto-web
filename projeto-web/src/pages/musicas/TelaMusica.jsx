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

// 👇️ 1. IMPORTAR O COMPONENTE COMENTARIOS (AJUSTE O CAMINHO SE NECESSÁRIO)
import Comentarios from '../../components/Comentarios.jsx'; 
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
        // É bom ter valores padrão para evitar erros, caso o currentSong não tenha esses campos.
        descricao: "Nenhuma descrição disponível.",
        letra: "Nenhuma letra disponível.",
        id: null
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

            {/* Bloco Direito: Opções (Artista, Descrição, Letra, COMENTÁRIOS) */}
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
                    {/* 👇️ 2. NOVO BOTÃO: COMENTÁRIOS */}
                    <Button 
                        variant={abaAtiva === 'comentarios' ? 'contained' : 'outlined'} 
                        onClick={() => setAbaAtiva('comentarios')}
                    >
                        Comentários
                    </Button>
                </Stack>

                {/* 👇️ 3. CONTEÚDO DAS ABAS RESOLVIDO (MANTIDO A LÓGICA DA main) */}
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