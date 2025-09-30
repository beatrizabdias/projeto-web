export default function AlbumHeader( {cover, type, title, artistImg = "https://placehold.co/30?text=Artist+Img.png", artist, year, duration} ) {
    return (
        <>
            <div className="album-header flex">
                <div className="album-cover">
                    <img src={cover} alt="Capa do Álbum"className="album-cover"/>
                </div>
                <div className="album-info flex">
                    <p>{type}</p>
                    <h1 className="album-title">{title}</h1>
                    <div className="album-details flex">
                        <div className="artist-logo-container">
                            <img className="artist-logo" src={artistImg} alt="Logo do Artista"/>
                        </div>
                        <span>{artist}</span>
                        <span>•</span>
                        <span className='lighter-text'>{year}</span>
                        <span>•</span>
                        <span className='lighter-text'>{duration}</span>
                    </div>
                </div>
            </div>
        </>
    )
}