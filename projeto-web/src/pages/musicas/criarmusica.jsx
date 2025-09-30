import React, { useState } from 'react';
import { 
    Container, 
    Typography, 
    TextField, 
    Button, 
    Box, 
    Grid, 
    Select, 
    MenuItem, 
    InputLabel, 
    FormControl,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles'; 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';

const generosLista = [
    "Clássica", "Country", "Eletrônica", "Forró", "Funk", "Gótico", 
    "Hip Hop", "Instrumental", "Jazz", "Metal", "MPB", "Ópera", 
    "Pagode", "Pop", "Punk", "Rap", "Rock", "Sertanejo"
];

const CustomTextField = styled(TextField)({
    '& label': {
        color: 'var(--secondary-text-color)', 
        '&.Mui-focused': {
            color: 'var(--orange)',
        },
    },
    '& .MuiInputBase-root': {
        color: 'var(--input-text-color)',
        backgroundColor: 'var(--input-bg)',
        borderRadius: '4px 4px 0 0',
        '&:hover': {
             backgroundColor: 'var(--input-bg) !important',
        },
        '&.Mui-focused': {
            backgroundColor: 'var(--input-bg)',
        }
    },
    '& .MuiFilledInput-underline:before': {
        borderBottomColor: 'var(--border-color)',
    },
    '& .MuiFilledInput-underline:hover:before': {
        borderBottomColor: 'var(--orange) !important',
    },
    '& .MuiFilledInput-underline:after': {
        borderBottomColor: 'var(--orange)',
    },
});

const CustomSelect = styled(Select)({
    color: 'var(--input-text-color)',
    backgroundColor: 'var(--input-bg)',
    borderRadius: '4px 4px 0 0',
    '& .MuiSelect-select': {
        padding: '24px 12px 8px 12px',
    },
    '& .MuiFilledInput-underline:before': {
        borderBottomColor: 'var(--border-color)',
    },
    '& .MuiFilledInput-underline:hover:before': {
        borderBottomColor: 'var(--orange) !important',
    },
    '& .MuiFilledInput-underline:after': {
        borderBottomColor: 'var(--orange)',
    },
    '& .MuiSelect-icon': {
        color: 'var(--icon-color)',
    }
});


function UploadMusica() {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        creditos: '',
        album: 'nada',
        generos: [],
        musicaFile: null, 
        imagemFile: null, 
    });

    const handleChange = (e) => {
        const { id, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            const generoValue = value;
            setFormData(prevData => ({
                ...prevData,
                generos: checked
                    ? [...prevData.generos, generoValue]
                    : prevData.generos.filter(g => g !== generoValue)
            }));
        } else if (type === 'file') {
            setFormData(prevData => ({
                ...prevData,
                [id]: files[0],
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados do Formulário:", formData);
        alert("Formulário submetido! Verifique o console para os dados.");
    };

    const handleFileUploadClick = (fileId) => {
        document.getElementById(fileId).click();
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ 
                padding: { xs: 2, sm: 4 }, 
                borderRadius: 2, 
            }}>
                
                <Typography variant="h4" component="h1" gutterBottom align="center" 
                    sx={{ 
                        fontWeight: 'bold', 
                        color: 'var(--text-color)'
                    }}>
                    Upload de Nova Música
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={4}>
                        
                        {/* 1. UPLOAD DE ARQUIVOS (Empilhados) */}
                        <Grid item xs={12} sm={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: 'var(--secondary-text-color)' }}>
                                Arquivo de Música:
                            </Typography>
                            <input
                                type="file"
                                id="musicaFile"
                                name="musicaFile"
                                accept="audio/*"
                                onChange={handleChange}
                                style={{ display: 'none' }} 
                            />
                            <Button 
                                variant="contained" 
                                fullWidth
                                startIcon={<CloudUploadIcon />}
                                onClick={() => handleFileUploadClick('musicaFile')}
                                sx={{ 
                                    backgroundColor: 'var(--orange)', 
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'var(--darker-orange)',
                                    }
                                }}
                            >
                                {formData.musicaFile ? formData.musicaFile.name : "Fazer Upload (.mp3, .wav)"}
                            </Button>
                        </Grid>
                        
                        <Grid item xs={12} sm={12}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: 'var(--secondary-text-color)' }}>
                                Imagem da Música:
                            </Typography>
                            <input
                                type="file"
                                id="imagemFile"
                                name="imagemFile"
                                accept="image/*"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <Button 
                                variant="outlined" 
                                fullWidth
                                startIcon={<ImageIcon />}
                                onClick={() => handleFileUploadClick('imagemFile')}
                                sx={{ 
                                    borderColor: 'var(--orange)', 
                                    color: 'var(--orange)',
                                    '&:hover': {
                                        borderColor: 'var(--darker-orange)',
                                        color: 'var(--darker-orange)',
                                        backgroundColor: 'transparent',
                                    }
                                }}
                            >
                                {formData.imagemFile ? formData.imagemFile.name : "Escolha do seu Dispositivo"}
                            </Button>
                        </Grid>

                        {/* 2. CAMPOS DE TEXTO (Todos Empilhados) */}
                        <Grid item xs={12} sm={12}>
                            <CustomTextField
                                label="Nome da Música"
                                fullWidth
                                id="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                                variant="filled"
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={12}>
                            <CustomTextField
                                label="Descrição"
                                fullWidth
                                id="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                variant="filled"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <CustomTextField
                                label="Créditos (Produtor, Compositores, etc.)"
                                fullWidth
                                id="creditos"
                                value={formData.creditos}
                                onChange={handleChange}
                                variant="filled"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id="album-label" sx={{ color: 'var(--secondary-text-color)' }}>Álbum</InputLabel>
                                <CustomSelect
                                    labelId="album-label"
                                    id="album"
                                    value={formData.album}
                                    onChange={handleChange}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: { 
                                                bgcolor: 'var(--card-bg)',
                                                color: 'var(--text-color)',
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="nada" sx={{ color: 'var(--secondary-text-color)' }}>--- Selecione um Álbum ---</MenuItem>
                                    <MenuItem value="artista" sx={{ color: 'var(--text-color)' }}>[Álbum do Artista]</MenuItem>
                                </CustomSelect>
                            </FormControl>
                        </Grid>

                        {/* 3. GÊNEROS (Checkboxes) */}
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h3" sx={{ 
                                mt: 2, 
                                mb: 2, 
                                borderBottom: '1px solid var(--border-color)', 
                                pb: 0.5,
                                color: 'var(--text-color)'
                            }}>
                                Gêneros:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                {generosLista.map(genero => (
                                    <FormControlLabel
                                        key={genero}
                                        control={
                                            <Checkbox
                                                id="generos"
                                                value={genero.toLowerCase().replace(/\s/g, '')}
                                                checked={formData.generos.includes(genero.toLowerCase().replace(/\s/g, ''))}
                                                onChange={handleChange}
                                                sx={{ 
                                                    color: 'var(--secondary-text-color)',
                                                    '&.Mui-checked': { color: 'var(--orange)' }
                                                }}
                                            />
                                        }
                                        label={<Typography sx={{ color: 'var(--text-color)' }}>{genero}</Typography>}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        {/* 4. BOTÃO DE SUBMISSÃO */}
                        <Grid item xs={12}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                size="large"
                                fullWidth
                                sx={{ 
                                    mt: 2, 
                                    py: 1.5, 
                                    fontWeight: 'bold',
                                    backgroundColor: 'var(--orange)',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'var(--darker-orange)',
                                    }
                                }}
                            >
                                Enviar Música para Análise
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default UploadMusica;