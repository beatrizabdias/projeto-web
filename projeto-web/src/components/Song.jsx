// Arquivo: src/components/Song.jsx (ou onde quer que este componente esteja)

export default function Song({title, duration}) {
    return (
        <>
            <div className="song flex">
                <div className="song-detail flex">
                    <i className="play-icon fa-solid fa-play"></i>
                    <div className="song-info flex">
                        <span className="song-title">{title}</span>           {/* CLASSE ADICIONADA */}
                        <span className="song-artist">Artista Famoso</span>   {/* CLASSE ADICIONADA */}
                    </div>
                </div>
                <div className="song-detail flex">
                    <i className="icon fa-solid fa-plus"></i>
                    <span className="song-duration">{duration}</span>         {/* CLASSE ADICIONADA */}
                    <i className="icon fa-solid fa-ellipsis"></i>
                </div>
            </div>
        </>
    )
}