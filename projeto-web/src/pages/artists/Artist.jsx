// src/pages/artists/Artist.jsx (VERSÃO CORRIGIDA)

import React from 'react';
import { useParams } from 'react-router-dom';
import ArtistHeader from '../../components/ArtistHeader.jsx';
import SongList from '../../components/SongList.jsx'; 
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
      <ArtistHeader artist={artist} />
      
      
      <SongList 
          tituloDaSecao={"Sucessos do Vaqueiro"} 
        
      />

      <ArtistPlaylist />

      

      <ArtistParecidos />
      
      <div className="margin-bottom"></div>
    </main>
  );
}