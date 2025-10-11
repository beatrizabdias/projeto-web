import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, setUserData } from '../redux/userSlice'; // Importamos setUserData

import ProfileHeader from '../components/ProfileHeader'; 

const CURRENT_USER_ID = '1';
const API_URL = 'http://localhost:3001'; 

export default function ProfileEdition() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Continua lendo do Redux (state.user.user)
    const user = useSelector((state) => state.user.user); 

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '', 
        email: '',
    });

    const [newProfileImage, setNewProfileImage] = useState(null);
    const fileInputRef = useRef(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                // CASO 1: O Redux JÁ TEM OS DADOS
                setFormData({
                    name: user.name || user.username || '', 
                    email: user.email || '',
                });
                setIsLoading(false);
            } else {
                // CASO 2: O Redux ESTÁ VAZIO, PRECISAMOS BUSCAR E PREENCHER
                try {
                    const response = await fetch(`${API_URL}/users/${CURRENT_USER_ID}`, {
                        method: 'GET',
                        headers: { 'Accept': 'application/json' }
                    });
                    if (!response.ok) {
                        throw new Error('Falha ao carregar dados do usuário.');
                    }
                    const userData = await response.json();
                    
                    // PASSO ESSENCIAL: Preenche o Redux com os dados iniciais
                    dispatch(setUserData(userData)); 

                    setFormData({
                        name: userData.name || userData.username || '', 
                        email: userData.email || '',
                    });
                } catch (error) {
                    console.error("Erro ao buscar usuário:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchUserData();
    }, [user, dispatch]); // Dependência em user e dispatch

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        // Usa o estado 'user' atualizado ou o fallback do fetch
        const currentUserData = user || (await fetch(`${API_URL}/users/${CURRENT_USER_ID}`).then(res => res.json())); 
        
        if (!currentUserData || !currentUserData.id) {
            alert("Dados de usuário inválidos.");
            setIsSaving(false);
            return;
        }

        const fullUserUpdate = {
            ...currentUserData, 
            name: formData.name, 
            email: formData.email,
            img: newProfileImage || currentUserData.img,
        };

        try {
            const response = await fetch(`${API_URL}/users/${CURRENT_USER_ID}`, {
                method: 'PUT', 
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(fullUserUpdate)
            });

            if (response.ok) {
                const updatedData = await response.json();
                
                // ATUALIZA O REDUX para sincronizar o nome em todo o app
                dispatch(updateProfile(updatedData)); 
                
                navigate('/perfil'); 
            } else {
                console.error("Erro ao salvar perfil. Status:", response.status);
                alert(`Falha ao atualizar. Verifique se o json-server está rodando e tem permissão.`);
            }
        } catch (error) {
            console.error("Erro de rede ao salvar perfil:", error);
            alert("Erro de conexão. Verifique se o json-server está online.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/perfil'); 
    };

    if (isLoading) {
        return <main><Typography color="white">Carregando dados para edição...</Typography></main>;
    }
    
    if (!user && !formData.name) {
         // Segundo check caso o fetch tenha falhado
        return <main><Typography color="red">Não foi possível carregar os dados do perfil.</Typography></main>;
    }
    
    // Configurações de estilo e props (mantidas da resposta anterior)
    const ORANGE_COLOR = 'var(--orange)'; 
    const RED_COLOR_BORDER = '#f44336'; 
    const INPUT_BG = 'var(--input-bg)';
    const INPUT_TEXT_COLOR = 'var(--input-text-color)';

    const saveButtonStyle = {
        backgroundColor: ORANGE_COLOR,
        color: 'white',
        borderRadius: 20,
        '&:hover': { backgroundColor: ORANGE_COLOR, opacity: 0.9 }
    };

    const cancelButtonPrimaryStyle = {
        color: RED_COLOR_BORDER,
        borderColor: RED_COLOR_BORDER,
        borderRadius: 20,
        '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)', borderColor: RED_COLOR_BORDER }
    };

    const inputFieldStyle = {
        '& .MuiFilledInput-root': {
            backgroundColor: INPUT_BG,
            color: INPUT_TEXT_COLOR,
            '&.Mui-focused': { backgroundColor: INPUT_BG }
        },
        '& .Mui-disabled .MuiFilledInput-input': { WebkitTextFillColor: INPUT_TEXT_COLOR, opacity: 1 },
        '& .MuiInputLabel-filled': { color: INPUT_TEXT_COLOR }
    };
    
    // O ProfileHeader continua lendo o nome do estado do Redux (se disponível) para o nome anterior
    const userDataToDisplay = user || {
        playlists: 0, 
        friends: 0,
        following: [],
        img: newProfileImage,
        name: formData.name // Mostra o nome do form se o 'user' estiver null
    };
    
    const profileHeaderProps = {
        username: userDataToDisplay.name || userDataToDisplay.username, 
        playlists: userDataToDisplay.playlists ? userDataToDisplay.playlists.length : 0, 
        friends: userDataToDisplay.friends ? userDataToDisplay.friends.length : 0,       
        following: userDataToDisplay.following ? userDataToDisplay.following.length : 0,   
        img: newProfileImage || userDataToDisplay.img 
    };

    return (
        <main>
            <Box sx={{ p: { xs: 2, md: 4, lg: 6 }, pb: 15 }}>
                
                <ProfileHeader 
                    user={profileHeaderProps} 
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

                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}> 
                    
                    <TextField
                        fullWidth
                        label="Nome Completo" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        variant="filled"
                        sx={inputFieldStyle}
                        InputLabelProps={{ shrink: true }} 
                        disabled={isSaving}
                    />
                    {/* ... (restante do formulário e botões) */}
                    
                    <TextField
                        fullWidth
                        label="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="filled"
                        type="email"
                        sx={inputFieldStyle}
                        InputLabelProps={{ shrink: true }} 
                        disabled={isSaving}
                    />

                    <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
                        
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={cancelButtonPrimaryStyle}
                            disabled={isSaving}
                        >
                            CANCELAR
                        </Button>
                        
                        <Button
                            type="submit"
                            variant="contained"
                            sx={saveButtonStyle}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Salvando...' : 'Salvar'}
                        </Button>
                        
                    </Box>
                </Box>
            </Box>
        </main>
    );
}