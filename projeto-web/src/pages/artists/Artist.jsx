// src/pages/artists/Artist.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtistHeader from '../../components/ArtistHeader.jsx';
import SongList from '../../components/SongList.jsx';
import ArtistParecidos from '../../components/ArtistParecidos';
import './artist.css';
import Section from '../../components/Section.jsx';
import AlbumCard from '../../components/AlbumCard.jsx';
import ArtistCircle from '../../components/ArtistCircle.jsx';
import api from '../../services/api.js'; // aquele axios com baseURL

export default function Artist({ artistID }) {
  const { id: routeId } = useParams();
  const effectiveId = artistID || routeId;

  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  // Buscar dados do artista atual
  useEffect(() => {
    api.get(`/topArtists/${effectiveId}`)
      .then((res) => setArtist(res.data))
      .catch(() => setArtist(null));
  }, [effectiveId]);

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

  if (!artist) {
    return (
      <main>
        <h1>Artista não encontrado</h1>
      </main>
    );
  }

  return (
    <main className='main-artist-page'>
      <ArtistHeader artist={artist} />
      <div class = "artist-song">
        <SongList 
          tituloDaSecao={"Sucessos do Vaqueiro"} 
          // Aqui futuramente você pode filtrar músicas por artista
        />

        <Section key={"Discografia"} title={"Discografia"}>
          {albums
            .filter((album) => album.artist.includes(artist.name)) // mostra só álbuns do artista
            .map((album) => (
              <AlbumCard
                key={album.id}
                id={album.id}
                cover={album.cover}
                title={album.title}
                artist={album.artist}
              />
            ))}
        </Section>

        <Section key={"Artistas Parecidos"} title={"Artistas Parecidos"}>
          {artists
            .filter((a) => String(a.id) !== String(artist.id)) // não mostra o próprio
            .map((a) => (
              <ArtistCircle
                key={a.id}
                id={a.id}
                image={a.image}
                name={a.name}
              />
            ))}
        </Section>

      </div>

      <div className="margin-bottom"></div>
    </main>
  );
}
