import React from 'react';
import './Home.css'; 

function Home() {
  return (
    <div>

      <main>
          <h1>Página Inicial</h1>
          <nav>
              <div className="nav-item selected">Tudo</div>
              <div className="nav-item">Playlists</div>
              <div className="nav-item">Músicas</div>
              <div className="nav-item">Álbuns</div>
              <div className="nav-item">Artistas</div>
          </nav>

          <h2>Em alta</h2>
          <div className="container">
              <div class="div">
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div> 
              </div>
          </div>
            <button id="scroll-btn" className="scroll-btn">▶</button> 
          
          <h2>Para você</h2>
          <div class="container">
              <div className="div">
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
              </div>
          </div>
            <button id="scroll-right" className="scroll-btn">▶</button>

          <h2>Top Hits do Rebanho</h2>
          <div className="container">
              <div className="div">
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
                  <div className="box"></div>
              </div>
          </div>

          <h2>Acús-ticos do Campo</h2>
          <div class="container">
              <div class="div">
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
              </div>
          </div>

          <h2>Pista de Dança Malhada</h2>
          <div class="container">
              <div class="div">
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
              </div>
          </div>


          <h2>Sofrência Bovina</h2>
          <div class="container">
              <div class="div">
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
              </div>
          </div>

          <h2>Pop Leite</h2>
          <div class="container">
              <div class="div">
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
                  <div class="box"></div>
              </div>
          </div>
      </main>
  </div>
  );
}
export default Home; 