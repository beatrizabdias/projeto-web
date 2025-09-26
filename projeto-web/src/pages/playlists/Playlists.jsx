import React from 'react';
import { Link } from 'react-router-dom'; 

const playlists = [
  { id: 1, name: "Nome playlist 1", img: "/assets/img/vacateste.jpg" }, 
  { id: 2, name: "Nome playlist 2", img: "/assets/img/vacateste.jpg" },
  { id: 3, name: "Nome playlist 3", img: "/assets/img/vacateste.jpg" },
];


function Playlists() {
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