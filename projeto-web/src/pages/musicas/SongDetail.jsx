import { useParams } from 'react-router-dom';
import AlbumHeader from '../../components/AlbumHeader.jsx';
import ArtistMusicList from '../../components/ArtistMusicList.jsx';
import { topSongs } from '../../data.js';
import './css/SongDetail.css'

export default function SongDetail( {songID} ) {
    const { id: routeId } = useParams();
    const effectiveId = songID || routeId;

    const song = topSongs.find((a) => a.id === effectiveId);

    if (!song) {
    return (
      <main>
        <h1>Música não encontrada</h1>
      </main>
    );
  }
    
    return (
        <main>
            <AlbumHeader 
                cover={song.cover} 
                type={'Single'} 
                title={song.title} 
                artist={song.artist} 
                year={"2025"} 
                duration={"1 música, 3min 20s"} 
            /> 
            
            <section className="p-4"> 
                <ArtistMusicList 
                    tracks={[song]} 
                />
            </section>
        </main>
    )
}