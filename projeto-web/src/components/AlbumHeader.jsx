export default function AlbumHeader() {
    return (
        <>
            <div className="album-header flex">
                <div className="album-cover">
                    <img src="https://placehold.co/250?text=Album+Cover.png" alt="Capa do Álbum"/>
                </div>
                <div className="album-info flex">
                    <p>Álbum</p>
                    <h1 className="album-title">Título do álbum</h1>
                    <div className="album-details flex">
                        <div className="artist-logo-container">
                            <img className="artist-logo" src="https://placehold.co/30?text=Artist+Img.png" alt="Logo do Artista"/>
                        </div>
                        <span>Artista Famoso</span>
                        <span>•</span>
                        <span className='lighter-text'>2024</span>
                        <span>•</span>
                        <span className='lighter-text'>12 músicas, 1h12min</span>
                    </div>
                </div>
            </div>
        </>
    )
}