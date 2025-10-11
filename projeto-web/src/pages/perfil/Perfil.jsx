import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

import { setUserData } from '../../redux/userSlice'; 
import { fetchPlaylistsByUserId } from '../../redux/playlistsSlice';
import { fetchArtistsByIds, fetchSongsByIds } from '../../redux/catalogoSlice'; 
import { fetchUsersByIds } from '../../redux/loginSlice'; 

import Section from '../../components/Section.jsx'; 
import PlaylistCard from '../../components/PlaylistCard.jsx'; 
import ArtistCircle from '../../components/ArtistCircle.jsx'; 
import ProfileHeader from '../../components/ProfileHeader'; 
import SongList from '../../components/SongList'; 

const API_URL = 'http://localhost:3001'; 

export default function Perfil() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    
    const loggedInUser = useSelector(state => state.user.user);
    
    const [isLoading, setIsLoading] = useState(true);

    const { items: friendDetails } = useSelector(state => state.auth.friends);
    const { items: userPlaylists } = useSelector(state => state.playlists.userPlaylists);
    const { items: followedArtists } = useSelector(state => state.catalog.followedArtists);
    const { items: likedSongsDetails } = useSelector(state => state.catalog.likedSongsDetails);

    const handleEditProfile = () => {
        navigate('/perfil/editar'); 
    };

    useEffect(() => {
        const fetchAndSetUser = async (userId) => {
            try {
                const response = await fetch(`${API_URL}/users/${userId}`);
                if (!response.ok) throw new Error('Falha ao carregar dados do usuário.');
                
                const userData = await response.json();
                
                dispatch(setUserData(userData)); 
                
            } catch (error) {
                console.error("Erro ao buscar usuário na Perfil Page:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (loggedInUser) {
            setIsLoading(false); 
        } else if (loggedInUser?.id) {
            fetchAndSetUser(loggedInUser.id); 
        } else {
            setIsLoading(false);
        }
    }, [loggedInUser, dispatch]);

    useEffect(() => {
        if (loggedInUser && loggedInUser.id) {
            dispatch(fetchPlaylistsByUserId(loggedInUser.id));

            if (loggedInUser.following?.length > 0) {
                dispatch(fetchArtistsByIds(loggedInUser.following));
            }
            
            if (loggedInUser.likedSongs?.length > 0) {
                dispatch(fetchSongsByIds(loggedInUser.likedSongs));
            }
            
            if (loggedInUser.friends?.length > 0) {
                dispatch(fetchUsersByIds(loggedInUser.friends));
            }
        }
    }, [loggedInUser, dispatch]);

    if (isLoading) {
        return <main><h1>Carregando perfil...</h1></main>;
    }

    if (!loggedInUser) {
        return <main><Typography color="red">Não foi possível carregar os dados do perfil.</Typography></main>;
    }

    const profileUserData = {
        ...loggedInUser,
        username: loggedInUser.name || loggedInUser.username,
        playlists: userPlaylists.length,  
        friends: loggedInUser.friends?.length || 0,
        following: loggedInUser.following || []
    };

    return (
        <main>
            <Box sx={{ p: { xs: 2, md: 4, lg: 6 }, pb: 15 }}>
                <ProfileHeader 
                    user={profileUserData} 
                    onEditClick={handleEditProfile} 
                />
                <Divider sx={{ my: 4 }} />
                <SongList 
                    tituloDaSecao={"Suas Músicas Mais Mugidas"} 
                />
                <Divider sx={{ my: 4 }} />
                <Section key={"Suas Playlists"} title={"Suas Playlists"}>
                    {userPlaylists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            id={playlist.id}
                            cover={playlist.cover}
                            title={playlist.title}
                            artist={loggedInUser.name}
                        />
                    ))}
                </Section>
                <Divider sx={{ my: 4 }} />
                <Section key={"Peões Amigos"} title={"Peões Amigos"}>
                    {friendDetails.map((friend) => (
                        <ArtistCircle
                            key={friend.id}
                            id={friend.id}
                            image={friend.image || 'https://placehold.co/400x400?text=User'}
                            name={friend.name}
                        />
                    ))} 
                </Section>

                <Divider sx={{ my: 4 }} />
    
                <Section key={"Artistas Seguidos"} title={"Artistas Seguidos"}>
                    {followedArtists.map((artist) => (
                        <ArtistCircle
                            key={artist.id}
                            id={artist.id}
                            image={artist.image}
                            name={artist.name}
                        />
                    ))} 
                </Section>
                
                <div className="margin-bottom"></div>
            </Box>
        </main>
    );
}