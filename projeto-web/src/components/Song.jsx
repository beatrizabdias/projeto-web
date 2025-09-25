export default function Song({title, duration}) {
    return (
        <>
            <div className="song flex">
                 <div className="song-detail flex">
                    <i className="play-icon fa-solid fa-play"></i>
                    <div className="song-info flex">
                        <span>{title}</span>
                        <span>Artista Famoso</span>
                    </div>
                 </div>
                 <div className="song-detail flex">
                    <i className="icon fa-solid fa-plus"></i>
                    <span>{duration}</span>
                    <i className="icon fa-solid fa-ellipsis"></i>
                 </div>
            </div>
        </>
    )
}