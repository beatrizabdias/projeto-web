import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    styled
} from '@mui/material';

import playlistsData from '../musicas/playlists.json';

const playlists = playlistsData;

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'var(--sidebar-bg)',
    border: '2px solid var(--orange)',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    color: 'var(--text-color)',
};

function Playlists() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => {
        setIsModalOpen(false);
        setNewPlaylistName('');
    }

    const handleCreatePlaylist = (e) => {
        e.preventDefault();
        if (newPlaylistName.trim()) {
            console.log(`Criando playlist com o nome: ${newPlaylistName}`);
            handleClose();
        }
    };

    return (
        <main className="content-area">
            <h1>Minhas Playlists</h1>

            <div className="playlists-container">
                <div className="add-playlist" onClick={handleOpen} style={{ cursor: 'pointer' }}>
                    <button className="btn-add-playlist"><i className="fas fa-plus"></i></button>
                    <p>Nova Playlist</p>
                </div>

                {playlists.map((playlist) => (
                    <Link
                        key={playlist.id}
                        to={`/playlists/${playlist.id}`}
                    >
                        <div className="box-playlist">
                            <div className="image-container">
                                <img src={playlist.img} alt={`IMG Playlist: ${playlist.name}`} />
                            </div>
                            <p>{playlist.name}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={ModalStyle} component="form" onSubmit={handleCreatePlaylist}>
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ color: 'var(--orange)', mb: 2 }}
                    >
                        Criar Nova Playlist
                    </Typography>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome da Playlist"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        InputLabelProps={{ style: { color: 'var(--secondary-text-color)' } }}
                        InputProps={{ style: { color: 'var(--text-color)', border: '1px solid var(--border-color)' } }}
                        sx={{ mb: 3 }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            onClick={handleClose}
                            sx={{ color: 'var(--secondary-text-color)' }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!newPlaylistName.trim()}
                            sx={{
                                backgroundColor: 'var(--orange)',
                                '&:hover': { backgroundColor: '#cc612a' }
                            }}
                        >
                            Criar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </main>
    );
}

export default Playlists;