
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';


import Home from './pages/Home';
import Playlists from './pages/playlists/Playlists';
import Albuns from './pages/albuns/Albuns';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/albuns" element={<Albuns />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
    </Router>
  );
}

export default App;