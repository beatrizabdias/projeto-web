// Playlists.jsx (Código REVISADO)

import React from 'react';
import { Link } from 'react-router-dom'; 
// Importa o arquivo JSON de playlists
import playlistsData from '../musicas/playlists.json'; 

// Use o dado importado
const playlists = playlistsData;


function Playlists() {
    // ... (O resto do componente permanece igual)
    return (
        <main className="content-area"> 
            <h1>Minhas Playlists</h1>

            <div className="playlists-container">
                <div className="add-playlist">
                    <button className="btn-add-playlist"><i className="fas fa-plus"></i></button>
                    <p>Nova Playlist</p>
                </div>

                {playlists.map((playlist) => (
                    <Link 
                        key={playlist.id} 
                        to={`/playlists/${playlist.id}`} 
                    >
                        <div className="box-playlist">
                            <div className="image-container">
                                <img src={playlist.img} alt={`IMG Playlist: ${playlist.name}`} />
                            </div>
                            <p>{playlist.name}</p>
                        </div>
                    </Link>
                ))}

            </div>

            <form hidden action="">
                <input name="plfile" type="file" />
                <input name="plname" type="text" />
            </form>
        </main>
    );
}

export default Playlists;