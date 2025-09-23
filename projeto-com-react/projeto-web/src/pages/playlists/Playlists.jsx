// src/pages/playlists/Playlists.jsx

import React from 'react';
import PlaylistCard from '../../components/playlists/PlaylistCard';
import AddPlaylist from '../../components/playlists/AddPlaylist';
import './Playlists.css'; 


import vacaImage from '../../assets/img/vacateste.jpg'; 

const playlistsMockData = [
  { id: 1, nome: 'Nome playlist 1', imagem: vacaImage },
  { id: 2, nome: 'Nome playlist 2', imagem: vacaImage },
  { id: 3, nome: 'Nome playlist 3', imagem: vacaImage },
];

function Playlists() {
  return (
    <main>
      <h1>Minhas Playlists</h1>
      <div className="playlists-container">
        <AddPlaylist />
        {playlistsMockData.map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </main>
  );
}


export default Playlists;