import { Link } from 'react-router-dom';
import logo from '../../assets/img/vaca-logo.png';
import { IconButton } from '@mui/material';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

function Header() {
  return (
    <header>
      <nav className="menu-cima">
        <Link to="/">
          <img src={logo} alt="Logo Moosica" />
        </Link>
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="search" />
        </div>
        <div className="theme-switch-container" id="theme-toggle">
          <i className="fas fa-sun"></i>
          <i className="fas fa-moon"></i>
          <span className="theme-toggle-btn"></span>
        </div>
      </nav>

      <nav className="menu-lateral">
        <Link to="/fila">
          <IconButton sx={{ color: '#fff' }} aria-label="Fila">
            <QueueMusicIcon />
          </IconButton>
        </Link>
        <Link to="/playlists">
          <IconButton sx={{ color: '#fff' }} aria-label="Playlists">
            <PlaylistPlayIcon />
          </IconButton>
        </Link>
      </nav>
    </header>
  );
}

export default Header;