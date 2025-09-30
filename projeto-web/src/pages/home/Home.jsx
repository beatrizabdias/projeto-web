import React, { useState } from 'react';
import Section from '../../components/Section';
import SongCard from '../../components/SongCard';
import AlbumCard from '../../components/AlbumCard';
import PlaylistCard from '../../components/PlaylistCard';
import ArtistCircle from '../../components/ArtistCircle';
import Navigation from '../../components/Navigation';
import { topSongs, topAlbums, topArtists, topPlaylists, sectionsData, navItemsData } from '../../data';
import './Home.css';

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
          {section.type === 'song' && topSongs.map((song, index) => (
            <SongCard
              key={index}
              id={song.id}
              cover={song.cover}
              title={song.title}
              artist={song.artist}
            />
          ))}

          {section.type === 'artist' && topArtists.map((artist, index) => (
            <ArtistCircle
              key={index}
              id={artist.id}
              image={artist.image}
              name={artist.name}
            />
          ))}  
          
          {section.type === 'playlist' && topPlaylists.map((playlist, index) => (
            <PlaylistCard
              key={index}
              id={playlist.id}
              cover={playlist.cover}
              title={playlist.title}
            />
          ))}

          {section.type === 'album' && topAlbums.map((album, index) => (
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