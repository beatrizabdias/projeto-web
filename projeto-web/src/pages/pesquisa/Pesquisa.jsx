// src/pages/pesquisa/Pesquisa.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

function Pesquisa() {
  const { query } = useParams();

  return (
    <main>
      <h1>Resultados da Pesquisa</h1>
      <p>Você pesquisou por: <strong>{query}</strong></p>
      {/* Aqui você pode adicionar a lógica para buscar e exibir os resultados */}
    </main>
  );
}

export default Pesquisa;