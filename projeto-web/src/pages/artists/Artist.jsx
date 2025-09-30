import React from 'react';
import { useParams } from 'react-router-dom';
import ArtistHeader from '../../components/ArtistHeader.jsx';
import ArtistMaisTocadas from '../../components/ArtistMaisTocadas.jsx';
import Song from '../../components/Song.jsx';
import './artist.css';  
import ArtistParecidos from '../../components/ArtistParecidos';
import { topArtists } from '../../data.js';

export default function Artist({ artistID }) {
  // Pega o id da URL (rota /artist/:id) e usa a prop como fallback
  const { id: routeId } = useParams();
  const effectiveId = artistID || routeId;

  const artist = topArtists.find((a) => a.id === effectiveId);

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
      
      <ArtistMaisTocadas 
      tituloDaSecao={"Sucessos do Vaqueiro"}/>

      <ArtistMaisTocadas 
      tituloDaSecao={"Você vai gostar"}/>
     

      
    </main>
  );
}
