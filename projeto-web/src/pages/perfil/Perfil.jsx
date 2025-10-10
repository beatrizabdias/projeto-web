import React, { useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
// 1. IMPORTAR: Importe o hook de navegação do React Router
import { useNavigate } from 'react-router-dom'; 

import { fetchPlaylistsByUserId } from '../../redux/playlistsSlice';
import { fetchArtistsByIds, fetchSongsByIds } from '../../redux/catalogoSlice'; 
import { fetchUsersByIds } from '../../redux/loginSlice'; 

import Section from '../../components/Section.jsx'; 
import PlaylistCard from '../../components/PlaylistCard.jsx'; 
import ArtistCircle from '../../components/ArtistCircle.jsx'; 
import ProfileHeader from '../../components/ProfileHeader'; 
import SongList from '../../components/SongList'; 

export default function Perfil() {
    const dispatch = useDispatch();
    // 2. INICIALIZAR: Inicialize o useNavigate
    const navigate = useNavigate(); 
 
    const { user } = useSelector(state => state.auth);
    const { items: friendDetails } = useSelector(state => state.auth.friends);
    const { items: userPlaylists } = useSelector(state => state.playlists.userPlaylists);
    const { items: followedArtists } = useSelector(state => state.catalog.followedArtists);
    const { items: likedSongsDetails } = useSelector(state => state.catalog.likedSongsDetails);

    console.log("DADOS PARA O PERFIL:", {
        userObject: user,
        fetchedPlaylists: userPlaylists,
        fetchUsersByIds : friendDetails 
    });

    // 3. HANDLER: Defina a função que será chamada no clique do botão
    const handleEditProfile = () => {
        // Redireciona o usuário para a rota de edição de perfil
        navigate('/perfil/editar'); 
    };

    useEffect(() => {
        if (user) {
            dispatch(fetchPlaylistsByUserId(user.id));

            if (user.following?.length > 0) {
                dispatch(fetchArtistsByIds(user.following));
            }
        
            if (user.likedSongs?.length > 0) {
                dispatch(fetchSongsByIds(user.likedSongs));
            }
            
            if (user.friends?.length > 0) {
                dispatch(fetchUsersByIds(user.friends));
            }
        }
    }, [user, dispatch]);

    if (!user) {
        return <main><h1>Carregando perfil...</h1></main>;
    }

    const profileUserData = {
        ...user,
        username: user.name || user.username,
        playlists: userPlaylists.length,  
        friends: user.friends?.length || 0 
    };

    return (
        <main>
            <Box sx={{ p: { xs: 2, md: 4, lg: 6 }, pb: 15 }}>
                <ProfileHeader 
                    user={profileUserData} 
                    // 4. PASSAR PROP: Passe a função de navegação para o componente filho
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
                            artist={user.name}
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