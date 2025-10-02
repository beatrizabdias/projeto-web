import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';

export default function ProfileHeader({ user }) {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' }, 
                alignItems: { xs: 'center', sm: 'flex-end' }, 
                gap: 3, 
                mb: 4,
                textAlign: { xs: 'center', sm: 'left' }
            }}
        >
            <Avatar 
                src="https://placehold.co/250?text=Icone+Vaqueiro" 
                sx={{ 
                    width: 150, 
                    height: 150, 
                    bgcolor: 'secondary.main',
                    boxShadow: 8 
                }}
            />
            <Box>
                <Typography variant="caption" color="text.secondary">
                    Perfil de Peão
                </Typography>
                <Typography variant="h2" component="h1" fontWeight={700} sx={{ mb: 1 }}>
                    {user.username}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' }, flexWrap: 'wrap' }}>
                    <Typography variant="body1" color="text.secondary">
                        {user.playlists} Seleções Públicas
                    </Typography>
                    <Typography variant="body1" color="text.secondary">•</Typography>
                    <Typography variant="body1" color="text.primary">
                        {user.friends} Peões Seguidos
                    </Typography>
                    <Button 
                        variant="outlined" 
                        size="medium" 
                        sx={{ ml: { sm: 2 }, mt: { xs: 1, sm: 0 }, borderRadius: 20 }}
                    >
                        Ajustar Perfil
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}