import { Link } from 'react-router-dom';
import logo from '../assets/img/vaca-logo.png';

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
          <i className="fas fa-sun" id="sun-icon"></i>
          <i className="fas fa-moon" id="moon-icon"></i>
          <span className="theme-toggle-btn"></span>
        </div>
      </nav>

      <nav className="menu-lateral">
        <Link to="/fila">
          <button><i className="material-icons">queue_music</i></button>
        </Link>
        <Link to="/playlists">
          <button><i className="material-icons">playlist_play</i></button>
        </Link>
        <Link to="/grupos">
          <button><i className="material-icons">groups</i></button>
        </Link>
        <Link to="/perfil">
          <button className="btn-profile"><i className="fa-solid fa-user"></i></button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;