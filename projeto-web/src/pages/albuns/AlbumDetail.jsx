// src/pages/playlists/Playlists.jsx

import React from 'react';
import './Albuns.css'; 
import { useParams } from 'react-router-dom';
import AlbumHeader from '../../components/AlbumHeader.jsx';
import ArtistMusicList from "../../components/SongListCover.jsx";
import { topAlbums } from '../../data.js';
import '../musicas/css/SongDetail.css'

export default function AlbumDetail( {albumID} ) {
    const { id: routeId } = useParams();
    const effectiveId = albumID || routeId;

    const album = topAlbums.find((a) => a.id === effectiveId);

    if (!album) {
    return (
      <main>
        <h1>Música não encontrada</h1>
      </main>
    );
  }
    
    return (
        <main>
            <AlbumHeader cover={album.cover} type={'Album'} title={album.title} artist={album.artist}  year={"2025"}  duration={"12 músicas, 53min 30s"} /> 
            <ArtistMaisTocadas />
        </main>
    )
}