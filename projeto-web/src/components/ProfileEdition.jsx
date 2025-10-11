import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, setUserData } from '../redux/userSlice';
import ProfileHeader from './ProfileHeader'; 

const API_URL = 'http://localhost:3001'; 

export default function ProfileEdition() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Obtém o objeto de usuário completo do Redux. Este deve ter o ID correto.
    const user = useSelector((state) => state.user.user); 
    // Captura o ID do usuário. Se 'user' for null/undefined, userId será null/undefined.
    const userId = user?.id; 

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Inicializa o estado do formulário com valores vazios por padrão.
    const [formData, setFormData] = useState({ name: '', email: '' });
    
    const [newProfileImage, setNewProfileImage] = useState(null);
    const fileInputRef = useRef(null); 

    // O useEffect agora só inicializa o formulário com os dados do Redux
    useEffect(() => {
        if (user && userId) {
            // Inicializa o formulário com os dados do usuário do Redux
            setFormData({
                name: user.name || user.username || '', 
                email: user.email || '',
            });
            setIsLoading(false);
        } else {
             // Se o 'user' estiver vazio, assume-se que o carregamento falhou 
             // (ou o usuário não está logado)
             setIsLoading(false);
             console.warn("Usuário não encontrado no estado do Redux. Verifique o fluxo de Login.");
        }
    }, [user, userId]); // Depende do objeto user inteiro e do seu ID.

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (upload) => setNewProfileImage(upload.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageUploadClick = () => fileInputRef.current.click();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        // **Verifica se o ID está presente ANTES de qualquer requisição**
        if (!userId) {
            alert("ID do usuário não encontrado. Não é possível salvar. Por favor, faça login novamente.");
            setIsSaving(false);
            return;
        }

        // Usa os dados do Redux como base para a atualização
        const currentUserData = user; 
        
        const fullUserUpdate = {
            ...currentUserData, 
            name: formData.name, 
            email: formData.email,
            // A imagem atualizada (se houver) ou a imagem antiga
            img: newProfileImage || currentUserData.img,
        };
        
        // Remove 'username' da atualização se 'name' estiver sendo usado, para evitar redundância
        if (fullUserUpdate.username && fullUserUpdate.name) {
             delete fullUserUpdate.username;
        }


        try {
            // **Usa o ID do usuário do Redux para o endpoint PUT**
            const response = await fetch(`${API_URL}/users/${userId}`, {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                // Garante que enviamos apenas os campos necessários (o objeto fullUserUpdate)
                body: JSON.stringify(fullUserUpdate) 
            });

            if (response.ok) {
                const updatedData = await response.json();
                dispatch(updateProfile(updatedData)); // Atualiza o estado do Redux
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

    const handleCancel = () => navigate('/perfil'); 

    if (isLoading) return <main><Typography color="white">Carregando dados para edição...</Typography></main>;
    
    // Mensagem de erro clara se o usuário não está disponível no Redux
    if (!user || !userId) return <main><Typography color="error" sx={{ color: 'red', p: 4 }}>Não foi possível carregar os dados do perfil. (Usuário não autenticado ou ID ausente no Redux)</Typography></main>;
    
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
    
    // Usa os dados do Redux (que são os dados do usuário correto)
    const userDataToDisplay = user; 
    
    const profileHeaderProps = {
        username: userDataToDisplay.name || userDataToDisplay.username, 
        // Verifica se as propriedades existem e são arrays antes de tentar .length
        playlists: userDataToDisplay.playlists ? userDataToDisplay.playlists.length : 0, 
        friends: userDataToDisplay.friends ? userDataToDisplay.friends.length : 0,       
        following: userDataToDisplay.following ? userDataToDisplay.following.length : 0,   
        // Exibe a imagem localmente selecionada ou a imagem do usuário
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