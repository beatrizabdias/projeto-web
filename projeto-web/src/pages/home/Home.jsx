import React, { useState, useEffect } from 'react';
import Section from '../../components/Section';
import SongCard from '../../components/SongCard';
import AlbumCard from '../../components/AlbumCard';
import PlaylistCard from '../../components/PlaylistCard';
import ArtistCircle from '../../components/ArtistCircle';
import Navigation from '../../components/Navigation';
import './Home.css';
import { sectionsData, navItemsData } from '../../data';
import api from '../../services/api.js';

function Home() {
  const [selectedFilter, setSelectedFilter] = useState('Tudo');

  const filterMap = {
    'Tudo': null,
    'Músicas': 'song',
    'Artistas': 'artist',
    'Playlists': 'playlist',
    'Álbuns': 'album',
  };

  const filteredSections = sectionsData.filter(section => {
    if (selectedFilter === 'Tudo') {
      return true;
    }
    return section.type === filterMap[selectedFilter];
  });

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    api.get("/topAlbums")
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error("Erro ao buscar álbuns:", err));
  }, []);

  useEffect(() => {
    api.get("/topArtists")
      .then((res) => setArtists(res.data))
      .catch((err) => console.error("Erro ao buscar artistas:", err));
  }, []);

  useEffect(() => {
    api.get("/topPlaylists")
      .then((res) => setPlaylists(res.data))
      .catch((err) => console.error("Erro ao buscar playlists:", err));
  }, []);

  useEffect(() => {
    api.get("/topSongs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Erro ao buscar músicas:", err));
  }, []);

  return (
    <main>
      <h1>Página Inicial</h1>

      <Navigation 
        navItemsData={navItemsData}
        selectedItem={selectedFilter}
        setSelectedItem={setSelectedFilter} 
      />

      {filteredSections.map((section) => (
        <Section key={section.title} title={section.title}>
          
          {section.type === 'song' && songs.map((song, index) => (
            <SongCard
              key={index}
              id={song.id}
              cover={song.cover}
              title={song.title}
              artist={song.artist}
            />
          ))}

          {section.type === 'artist' && artists.map((artist, index) => (
            <ArtistCircle
              key={index}
              id={artist.id}
              image={artist.image}
              name={artist.name}
            />
          ))}  
          
          {section.type === 'playlist' && playlists.map((playlist, index) => (
            <PlaylistCard
              key={index}
              id={playlist.id}
              cover={playlist.cover}
              title={playlist.title}
            />
          ))}

          {section.type === 'album' && albums.map((album, index) => (
            <AlbumCard
              key={index}
              id={album.id}
              cover={album.cover}
              title={album.title}
              artist={album.artist}
            />
          ))}

        </Section>
      ))}
    </main>
  );
}

export default Home;