import React from 'react';
import { Box, Divider } from '@mui/material';
import Section from '../../components/Section.jsx'; 
import AlbumCard from '../../components/AlbumCard.jsx'; 
import ArtistCircle from '../../components/ArtistCircle.jsx'; 
import ProfileHeader from '../../components/ProfileHeader'; 
import SongList from '../../components/SongList'; 

const topAlbums = [
    { id: 101, cover: '...', title: 'Disco 1', artist: 'Artista X' },
    { id: 102, cover: '...', title: 'Disco 2', artist: 'Artista Y' },
];
const topArtists = [
    { id: 201, image: '...', name: 'Amigo 1' },
    { id: 202, image: '...', name: 'Amigo 2' },
];

export default function Perfil() {
    const user = {
        username: "Username",
        playlists: 5,
        friends: 15
    };

    return (
        <main>
            <Box sx={{ p: { xs: 2, md: 4, lg: 6 }, pb: 15 }}>
                
                <ProfileHeader user={user} />
                
                <Divider sx={{ my: 4 }} />

                <SongList 
                    tituloDaSecao={"Suas Músicas Mais Mugidas"} 
                />

                <Divider sx={{ my: 4 }} />

                
                <Section key={"Suas Playlists"} title={"Suas Playlists"} cardType="album">
                    {topAlbums.map((album, index) => (
                        <AlbumCard
                            key={index}
                            id={album.id}
                            cover={album.cover}
                            title={album.title}
                            artist={user.username} 
                        />
                    ))}
                </Section>
                
                <Divider sx={{ my: 4 }} />

                <Section key={"Peões Amigos"} title={"Peões Amigos"}>
                    {topArtists.map((artist, index) => (
                        <ArtistCircle
                            key={index}
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