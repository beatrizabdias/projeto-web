import { useParams } from 'react-router-dom';
import AlbumHeader from '../../components/AlbumHeader.jsx';
import ArtistMusicList from '../../components/SongListCover.jsx';
import ArtistMaisTocadas from '../../components/SongList.jsx';
// import { topSongs } from '../../data.js';
import './css/SongDetail.css'
import api from "../../services/api";

export default function SongDetail( {songID} ) {
    const { id: routeId } = useParams();
    const effectiveId = songID || routeId;

    const [song, setSong] = useState(null);
    
        useEffect(() => {
          api.get(`/topSongs/${effectiveId}`)
            .then((res) => setSong(res.data))
            .catch((err) => console.error("Erro ao buscar música:", err));
        }, []);

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
                <ArtistMaisTocadas 
                    tracksArr={[song]} 
                />
            </section>
        </main>
    )
}