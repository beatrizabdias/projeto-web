  import React from 'react'
  import { Outlet } from 'react-router-dom'
  import Header from './Header'
  import Footer from './Footer'
  import Player from './Player'

  const MainLayout = () => {
    return (
      <>
        <Header />
        <main className="main-content-area">
          <Outlet />
        </main>
        <Footer />
      </>
    );
  };

  export default MainLayout