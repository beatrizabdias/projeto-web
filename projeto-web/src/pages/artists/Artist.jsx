// src/pages/artists/Artist.jsx (VERSÃO CORRIGIDA)

import React from 'react';
import { useParams } from 'react-router-dom';
import ArtistHeader from '../../components/ArtistHeader.jsx';
import ArtistMusicList from '../../components/ArtistMusicList.jsx'; 
import ArtistPlaylist from '../../components/ArtistPlaylist';       // Importado
import ArtistParecidos from '../../components/ArtistParecidos';     // Importado
import './artist.css';  
import { topArtists } from '../../data.js';

export default function Artist({ artistID }) {
  const { id: routeId } = useParams();
  const effectiveId = artistID || routeId;
  // Sugestão de correção na busca para garantir que o ID seja encontrado (converte para string)
  const artist = topArtists.find((a) => String(a.id) === String(effectiveId));

  if (!artist) {
    return (
      <main>
        <h1>Artista não encontrado</h1>
      </main>
    );
  }

  return (
    <main>
      <ArtistHeader name={artist.name} about={artist.about || ''} />
      
      {/* 1. MÚSICAS POPULARES (Sucessos do Vaqueiro) - Corrigido o nome e adicionado 'tracks' */}
      <ArtistMusicList 
          title={"Populares"} // Nome mais parecido com o Spotify
          tracks={artist.topTracks || []} 
      />

      {/* 2. DISCOGRAFIA (Álbuns) - Corrigido o nome do componente para Album/Playlist */}
      <ArtistPlaylist />

      {/* 3. RECOMENDAÇÕES (Você vai gostar) */}
      <ArtistMusicList 
          title={"Com " + artist.name} // Nome customizado igual ao Spotify
          tracks={artist.recommendedTracks || []}
      />
      
      {/* 4. ARTISTAS PARECIDOS - Adicionado */}
      <ArtistParecidos />
      
      <div className="margin-bottom"></div>
    </main>
  );
}