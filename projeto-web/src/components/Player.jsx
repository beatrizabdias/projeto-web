import React, { useState, useRef, useEffect } from 'react';

// Função auxiliar para formatar segundos em MM:SS
const formatTime = (time) => {
  if (isNaN(time) || time < 0) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5); // Volume inicial em 50%

  const audioRef = useRef(null);

  // --- Funções de Controle ---

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        // Trata a exceção de promessa de autoplay
        console.error("Erro ao tentar tocar o áudio. Tente novamente clicando no play.", error);
      });
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Permite ao usuário clicar na barra de progresso para pular
  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const bar = event.currentTarget;
    // Posição do clique em relação ao início da barra
    const clickPosition = event.clientX - bar.getBoundingClientRect().left;
    // Calcula a porcentagem do clique na barra
    const clickPercent = clickPosition / bar.offsetWidth;
    
    // Calcula o novo tempo em segundos e aplica ao áudio
    audio.currentTime = clickPercent * audio.duration;
  };

  // --- Efeitos Colaterais e Event Listeners ---

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Configura o volume inicial do elemento <audio> (0.5)
    audio.volume = volume; 

    // Atualiza o progresso e o tempo atual (a cada segundo)
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        const currentProgress = (audio.currentTime / audio.duration) * 100;
        setProgress(currentProgress);
      }
    };

    // Pega a duração total da música quando ela é carregada
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Reseta o player quando a música termina
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      audio.currentTime = 0;
    };
    
    // Adiciona os listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata); 
    audio.addEventListener('ended', handleEnded);

    // Função de limpeza: Remove os listeners
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume]); // Executa na montagem e quando o estado 'volume' muda

  // Lógica Dinâmica para os Ícones
  const PlayPauseIcon = isPlaying ? "fas fa-pause" : "fas fa-play";
  const VolumeIcon = volume === 0 ? "fas fa-volume-mute" : volume < 0.5 ? "fas fa-volume-down" : "fas fa-volume-up";


  return (
    <>
      {/* Elemento de Áudio Oculto. Use o caminho correto para o seu MP3 */}
      <audio ref={audioRef} src="/assets/audio/relaxingpiano.mp3" preload="metadata" />
      
      {/* Container da Barra de Progresso e Tempos */}
      <div className="barra-progresso-container">
        <span className="current-time">{formatTime(currentTime)}</span>
        <div 
          className="barra-progresso"
          onClick={handleSeek} // Adiciona funcionalidade de seek (pular na música)
        >
          <div 
            className="progresso" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <span className="duration-time">{formatTime(duration)}</span>
      </div>

      <div className="player">
        <div className="controle-musica">
          <button className="controle-btn">
            <i className="fas fa-backward"></i>
          </button>
          
          <button 
            className="play-pause-btn"
            onClick={handlePlayPause}
          >
            <i className={PlayPauseIcon}></i>
          </button>
          
          <button className="controle-btn">
            <i className="fas fa-forward"></i>
          </button>
        </div>

        <p className="song-info">Música Teste - Moosica</p>
        
        {/* Controle de Volume */}
        <div className="volume-control">
            <i className={VolumeIcon}></i>
            <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
            />
        </div>
      </div>
    </>
  );
}

export default Player;