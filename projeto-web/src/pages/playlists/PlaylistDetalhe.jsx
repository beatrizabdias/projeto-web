import React from 'react';
import { useParams } from 'react-router-dom';

function PlaylistDetalhe() {
  const { id } = useParams();

  const playlist = {
    id: id,
    nome: `Playlist de Teste ${id}`,
  };

  return (
    <main>
      <h1>Detalhes da Playlist</h1>
      <h2>ID: {playlist.id}</h2>
      <h3>Nome: {playlist.nome}</h3>
    </main>
  );
}

export default PlaylistDetalhe;