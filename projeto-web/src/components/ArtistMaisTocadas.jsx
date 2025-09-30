import React from 'react';
import Song from './Song';

const tracksData = [
    { rank: 1, coverUrl: 'https://placehold.co/250?text=song+cover.png', title: 'Título da Música 1', artist: 'Artista Famoso', album: 'Álbum X', duration: '3:49' },
    { rank: 2, coverUrl: 'https://placehold.co/250?text=song+cover.png', title: 'Título da Música 2', artist: 'Artista Famoso', album: 'Álbum Y', duration: '4:12' },
    { rank: 3, coverUrl: 'https://placehold.co/250?text=song+cover.png', title: 'Título da Música 3', artist: 'Artista Famoso', album: 'Álbum Z', duration: '3:05' },
    { rank: 4, coverUrl: 'https://placehold.co/250?text=song+cover.png', title: 'Título da Música 4', artist: 'Artista Famoso', album: 'Álbum A', duration: '2:55' },
    { rank: 5, coverUrl: 'https://placehold.co/250?text=song+cover.png', title: 'Título da Música 5', artist: 'Artista Famoso', album: 'Álbum B', duration: '3:20' },
];

export default function ArtistMaisTocadas( {tituloDaSecao} ) {
    return (
        <div className="mais-tocadas">
            <h3>{tituloDaSecao}</h3>
            
            {tracksData.map((song) => (
                <Song 
                    key={song.rank}
                    rank={song.rank}
                    coverUrl={song.coverUrl}
                    title={song.title}
                    artist={song.artist}
                    album={song.album}
                    duration={song.duration}
                />
            ))}
        </div>
    );
}