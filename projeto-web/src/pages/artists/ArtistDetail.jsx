import React from 'react';
import { useParams } from 'react-router-dom';
import { topArtists } from '../data'; 
import ArtistHeader from '../components/ArtistHeader'; 
import ArtistMusicList from '../components/ArtistMusicList'; 
import CardGrid from '../components/CardGrid'; 
import SongCard from '../components/SongCard'; 

const ArtistDetail = () => {
  const { id } = useParams();
  const artist = topArtists.find(a => a.id === id);

  if (!artist) {
    return (
      <div className="p-6 text-2xl font-bold text-white">
        Artista com ID "{id}" não encontrado.
      </div>
    );
  }

  const topTracks = artist.topTracks || [];
  const recommendedTracks = artist.recommendedTracks || [];

  return (
    <div className="ArtistDetail-page">
      
      <ArtistHeader artist={artist} />

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-4">Populares</h2>
        <ArtistMusicList tracks={topTracks} />
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-4">Com {artist.name}</h2>
        <CardGrid>
            {recommendedTracks.map(track => (
                <Card 
                    key={track.id}
                    title={track.title} 
                    artist={track.artist} 
                    cover={track.cover}
                    path={`/songDetail/${track.id}`}
                />
            ))}
        </CardGrid>
      </section>

      <section className="mt-10 mb-20">
        <h2 className="text-2xl font-bold text-white mb-4">Mais sobre {artist.name}</h2>
        <p className="text-zinc-400 leading-relaxed max-w-4xl">
          {artist.about}
        </p>
      </section>

    </div>
  );
};

export default ArtistDetail;