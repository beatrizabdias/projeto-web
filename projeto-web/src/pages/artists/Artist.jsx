// src/pages/artists/Artist.jsx (VERSÃO CORRIGIDA)

import React from 'react';
import { useParams } from 'react-router-dom';
import ArtistHeader from '../../components/ArtistHeader.jsx';
import SongList from '../../components/SongList.jsx';      
import ArtistParecidos from '../../components/ArtistParecidos';     
import './artist.css';  
import Section from '../../components/Section.jsx'; 
import AlbumCard from '../../components/AlbumCard.jsx'; 
import ArtistCircle from '../../components/ArtistCircle.jsx'; 
import { topArtists, topAlbums } from '../../data.js';

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

      
      
      <Section key={"Discografia"} title={"Discografia"}>
        {topAlbums.map((album, index) => (
          <AlbumCard
            key={index}
            id={album.id}
            cover={album.cover}
            title={album.title}
            artist={album.artist}
          />
         ))}
      </Section>


        
      <Section key={"Artistas Parecidos"} title={"Artistas Parecidos"}>
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
    </main>
  );
}