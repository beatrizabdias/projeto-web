import React, { useState, useRef } from 'react';
import { Box, TextField, Button, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProfileHeader from '../components/ProfileHeader'; 

export default function ProfileEdition() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mockUser = {
        name: "Bebel",
        email: "bebel@email.com",
        playlists: 3, 
        friends: 1, 
        following: [1, 2, 3], 
        username: "Bebel",
        img: "https://placehold.co/250?text=Icone+Vaqueiro" 
    };
    const user = mockUser; 
    
    const [formData, setFormData] = useState({
        name: '', 
        email: '',
    });

    const [newProfileImage, setNewProfileImage] = useState(null);
    const fileInputRef = useRef(null); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (upload) => {
                setNewProfileImage(upload.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Dados a serem salvos:", formData);
        console.log("Nova imagem selecionada (URL base64):", newProfileImage);
        
        // TODO: Implementar a lógica de upload da imagem e atualização do perfil
        
        navigate('/perfil'); 
    };

    const handleCancel = () => {
        navigate('/perfil'); 
    };

    if (!user) {
        return <main><h1>Carregando dados para edição...</h1></main>;
    }
    
    const ORANGE_COLOR = 'var(--orange)'; 
    const RED_COLOR_BORDER = '#f44336'; 
    const INPUT_BG = 'var(--input-bg)';
    const INPUT_TEXT_COLOR = 'var(--input-text-color)';


    const saveButtonStyle = {
        backgroundColor: ORANGE_COLOR,
        color: 'white',
        borderRadius: 20,
        '&:hover': {
            backgroundColor: ORANGE_COLOR,
            opacity: 0.9,
        }
    };

    const cancelButtonPrimaryStyle = {
        color: RED_COLOR_BORDER,
        borderColor: RED_COLOR_BORDER,
        borderRadius: 20,
        '&:hover': {
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            borderColor: RED_COLOR_BORDER,
        }
    };

    const inputFieldStyle = {
        '& .MuiFilledInput-root': {
            backgroundColor: INPUT_BG,
            color: INPUT_TEXT_COLOR,
            '&:hover': {
                backgroundColor: INPUT_BG,
            },
            '&.Mui-focused': {
                backgroundColor: INPUT_BG,
            },
        },
        '& .Mui-disabled .MuiFilledInput-input': {
            WebkitTextFillColor: INPUT_TEXT_COLOR,
            opacity: 1, 
        },
        '& .MuiInputLabel-filled': {
            color: INPUT_TEXT_COLOR,
        }
    };

    const profileUserData = {
        ...user,
        username: user.name || user.username,
        playlists: user.playlists || 0,  
        friends: user.friends || 0,
        img: newProfileImage || user.img 
    };

    return (
        <main>
            <Box sx={{ p: { xs: 2, md: 4, lg: 6 }, pb: 15 }}>
                
                <ProfileHeader 
                    user={profileUserData} 
                    onEditClick={null} 
                    onImageEditClick={handleImageUploadClick} 
                />
                
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />

                <Divider sx={{ my: 4 }} />

                <Box component="form" onSubmit={handleSave} sx={{ maxWidth: 600 }}>
                    
                    <TextField
                        fullWidth
                        label="Nome" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        variant="filled"
                        required
                        sx={inputFieldStyle}
                        InputLabelProps={{ shrink: true }} 
                    />

                    <TextField
                        fullWidth
                        label="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="filled"
                        type="email"
                        required
                        sx={inputFieldStyle}
                        InputLabelProps={{ shrink: true }} 
                    />

                    <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
                        
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={cancelButtonPrimaryStyle}
                        >
                            Cancelar
                        </Button>
                        
                        <Button
                            type="submit"
                            variant="contained"
                            sx={saveButtonStyle}
                        >
                            Salvar Alterações
                        </Button>
                        
                    </Box>
                </Box>
            </Box>
        </main>
    );
}