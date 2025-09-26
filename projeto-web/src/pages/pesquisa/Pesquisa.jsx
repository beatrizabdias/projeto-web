// src/pages/Pesquisa.jsx (Exemplo de como usar o valor)

import React from 'react';
import { useSearchParams } from 'react-router-dom'; // Importa o hook
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Pesquisa() {
  // Captura os parâmetros de consulta (query parameters)
  const [searchParams] = useSearchParams();
  
  // Lê o valor do parâmetro 'q' (ex: /pesquisa?q=rock)
  const query = searchParams.get('q'); 

  return (
    <>
      <Header />
      <main className="content-area">
        <h1>Resultados da Pesquisa</h1>
        {query ? (
          <p>Exibindo resultados para: <strong>"{query}"</strong></p>
        ) : (
          <p>Digite um termo na barra de pesquisa para começar.</p>
        )}
        
      </main>
    </>
  );
}

export default Pesquisa;