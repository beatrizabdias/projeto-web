import React, { useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylistsByUserId } from '../../redux/playlistsSlice';
import { fetchArtistsByIds, fetchSongsByIds } from '../../redux/catalogoSlice'; 
import { fetchUsersByIds } from '../../redux/loginSlice'; 

import Section from '../../components/Section.jsx'; 
import AlbumCard from '../../components/AlbumCard.jsx'; 
import ArtistCircle from '../../components/ArtistCircle.jsx'; 
import ProfileHeader from '../../components/ProfileHeader'; 
import SongList from '../../components/SongList'; 

export default function Perfil() {
    const dispatch = useDispatch();
  
    const { user, friends: { items: friendDetails } } = useSelector(state => state.auth);
    const { items: userPlaylists } = useSelector(state => state.playlists.userPlaylists);
    const { items: followedArtists } = useSelector(state => state.catalog.followedArtists);
    const { items: likedSongsDetails } = useSelector(state => state.catalog.likedSongsDetails);

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
                <ProfileHeader user={profileUserData} />
                <Divider sx={{ my: 4 }} />
                <SongList 
                    tituloDaSecao={"Suas Músicas Mais Mugidas"} 
                    tracksArr={likedSongsDetails}
                />
                <Divider sx={{ my: 4 }} />
                <Section key={"Suas Playlists"} title={"Suas Playlists"} cardType="album">
                    {userPlaylists.map((playlist) => (
                        <AlbumCard
                            key={playlist.id}
                            id={playlist.id}
                            cover={playlist.cover}
                            title={playlist.name}
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