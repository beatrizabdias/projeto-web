import React from 'react';
import { Box } from '@mui/material';

/**
 * Componente de barra visual para mostrar a proporção de likes.
 * @param {number} likePercentage - A porcentagem de Likes (de 0 a 100).
 */
function BarraLikes({ likePercentage }) {
    const dislikePercentage = 100 - likePercentage;

    return (
        <Box 
            sx={{
                width: '100%',
                height: 8, 
                backgroundColor: '#555',
                borderRadius: 4,
                overflow: 'hidden',
                mt: 1, // Margem superior para separar dos ícones
            }}
        >
            <Box
                sx={{
                    width: `${likePercentage}%`,
                    height: '100%',
                    backgroundColor: '#ff7533', // Cor dos Likes (Laranja)
                    transition: 'width 0.3s ease-in-out',
                }}
            />
        </Box>
    );
}

export default BarraLikes;