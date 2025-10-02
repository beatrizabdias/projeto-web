import React, { useState, useEffect } from 'react';
import Section from '../../components/Section';
import SongCard from '../../components/SongCard';
import AlbumCard from '../../components/AlbumCard';
import PlaylistCard from '../../components/PlaylistCard';
import ArtistCircle from '../../components/ArtistCircle';
import Navigation from '../../components/Navigation';
// import { topSongs, topAlbums, topArtists, topPlaylists, sectionsData, navItemsData } from '../../data';
import './Home.css';
import { sectionsData, navItemsData } from '../../data';
import api from '../../services/api.js';

function Home() {
  // Estado para controlar o filtro selecionado. Começa com "Tudo".
  const [selectedFilter, setSelectedFilter] = useState('Tudo');

  // Mapeamento entre os valores de filtro e os tipos de seção
  const filterMap = {
    'Tudo': null, // Exibe todas as seções
    'Músicas': 'song',
    'Artistas': 'artist',
    'Playlists': 'playlist',
    'Álbuns': 'album',
  };

  // Lógica de filtragem: cria uma nova lista apenas com as seções que devem ser exibidas.
  const filteredSections = sectionsData.filter(section => {
    if (selectedFilter === 'Tudo') {
      return true; // Se for "Tudo", retorna todas as seções
    }
    // Caso contrário, retorna apenas as seções cujo tipo corresponde ao filtro
    return section.type === filterMap[selectedFilter];
  });

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  // Buscar álbuns
  useEffect(() => {
    api.get("/topAlbums")
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error("Erro ao buscar álbuns:", err));
  }, []);

  // Buscar artistas para a seção "Parecidos"
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

      {/* O componente de Navegação controla o estado do filtro */}
      <Navigation 
        navItemsData={navItemsData}
        selectedItem={selectedFilter}
        setSelectedItem={setSelectedFilter} 
      />

      {/* Mapeamos a lista JÁ FILTRADA para renderizar o conteúdo */}
      {filteredSections.map((section) => (
        <Section key={section.title} title={section.title}>
          
          {/* Renderização condicional para cada tipo de card */}
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