// src/components/Comentarios.jsx

import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    List, 
    ListItem, 
    ListItemText, 
    Divider 
} from '@mui/material';

// Função auxiliar para gerar um ID simples
const generateId = () => Math.random().toString(36).substring(2, 9);

/**
 * Componente para a seção de comentários (Frontend funcional com localStorage).
 * @param {string} musicaId - O ID único da música para chavear o localStorage.
 */
function Comentarios({ musicaId }) {
    const storageKey = `comments_${musicaId}`;
    
    // Estado para carregar/salvar comentários no localStorage
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState('');

    // Efeito para carregar comentários quando o componente é montado ou a musicaId muda
    useEffect(() => {
        try {
            const storedComments = localStorage.getItem(storageKey);
            setComentarios(storedComments ? JSON.parse(storedComments) : []);
        } catch (error) {
            console.error("Erro ao carregar comentários:", error);
        }
    }, [musicaId, storageKey]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (novoComentario.trim() === '') return;

        const novoCom = {
            id: generateId(),
            texto: novoComentario.trim(),
            autor: 'Você (Anônimo)', // Nome simulado
            data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR').substring(0, 5),
        };

        // Adiciona o novo comentário (mais novo primeiro)
        const novosComentarios = [novoCom, ...comentarios];
        setComentarios(novosComentarios);
        setNovoComentario('');
        
        // Salva a lista atualizada no localStorage
        try {
            localStorage.setItem(storageKey, JSON.stringify(novosComentarios));
        } catch (error) {
            console.error("Erro ao salvar comentários:", error);
        }
    };

    return (
        <Box sx={{ padding: 0 }}>
            {/* Formulário de Adição de Comentário */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                <TextField
                    label="Adicionar um comentário"
                    multiline
                    fullWidth
                    rows={3}
                    value={novoComentario}
                    onChange={(e) => setNovoComentario(e.target.value)}
                    variant="outlined"
                    // Estilos do MUI para tema escuro e destaque em laranja
                    InputLabelProps={{ style: { color: '#ff7533' } }}
                    sx={{ 
                        mb: 1, 
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#555' },
                            '&:hover fieldset': { borderColor: '#ff7533' },
                            '&.Mui-focused fieldset': { borderColor: '#ff7533' },
                        }
                    }}
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={novoComentario.trim() === ''}
                    sx={{
                        backgroundColor: '#ff7533 !important',
                        '&:hover': { backgroundColor: '#e66a2e !important' },
                        mt: 1 
                    }}
                >
                    Comentar
                </Button>
            </Box>

            {/* Lista de Comentários */}
            <Typography variant="h6" gutterBottom sx={{ color: '#ff7533', borderTop: '1px solid #444', pt: 2 }}>
                Comentários ({comentarios.length})
            </Typography>
            
            {comentarios.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                    Nenhum comentário ainda. Seja o primeiro a opinar!
                </Typography>
            ) : (
                <List disablePadding>
                    {comentarios.map((comentario, index) => (
                        <React.Fragment key={comentario.id}>
                            <ListItem alignItems="flex-start" sx={{ px: 0, py: 1 }}>
                                <ListItemText
                                    primary={
                                        <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
                                            {comentario.autor}
                                        </Typography>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'block', color: '#e0e0e0', whiteSpace: 'pre-wrap' }}
                                                component="span"
                                                variant="body2"
                                            >
                                                {comentario.texto}
                                            </Typography>
                                            <Typography
                                                sx={{ display: 'block', color: '#b3b3b3', fontSize: '0.75rem', mt: 0.5 }}
                                                component="span"
                                                variant="caption"
                                            >
                                                {comentario.data}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            {index < comentarios.length - 1 && <Divider component="li" sx={{ borderColor: '#444' }} />}
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Box>
    );
}

export default Comentarios;