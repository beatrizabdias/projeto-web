import React, { useState } from 'react';

export default function CriarAlbum() {
  const [form, setForm] = useState({
    nome: '',
    artista: '',
    capa: null,
    data: '',
    genero: '',
    tipo: '',
  });

  function handleChange(e) {
    const { id, value, type, files, name } = e.target;
    if (type === 'file') {
      setForm({ ...form, capa: files[0] });
    } else if (type === 'radio') {
      setForm({ ...form, tipo: value });
    } else {
      setForm({ ...form, [id || name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Adicione lógica para salvar os dados
    alert('Álbum salvo!');
  }

  return (
    <div className="container">
      <h1>Criar álbum</h1>
      <form className="flex" onSubmit={handleSubmit}>
        <div className="field flex">
          <label htmlFor="nome-do-album">Nome do álbum</label>
          <input required id="nome-do-album" type="text" value={form.nome} onChange={handleChange} />
        </div>
        <div className="field flex">
          <label htmlFor="artista">Artista</label>
          <input required id="artista" type="text" value={form.artista} onChange={handleChange} />
        </div>
        <div className="field flex">
          <label htmlFor="capa-do-album">Capa do álbum</label>
          <input required type="file" id="capa-do-album" onChange={handleChange} />
        </div>
        <div className="field flex">
          <label htmlFor="data-lancamento">Data de lançamento</label>
          <input required type="date" id="data-lancamento" value={form.data} onChange={handleChange} />
        </div>
        <div className="field flex">
          <label htmlFor="genero-musical">Gênero musical</label>
          <select required id="genero-musical" value={form.genero} onChange={handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="rap">Rap</option>
            <option value="hiphop">Hip-hop</option>
            <option value="indie">Indie</option>
            <option value="mpb">MPB</option>
          </select>
        </div>
        <div className="field flex">
          <fieldset id="tipo-album">
            <legend>Tipo de álbum</legend>
            <div>
              <input required type="radio" id="ep-album" name="tipo-album" value="ep" checked={form.tipo === 'ep'} onChange={handleChange} />
              <label htmlFor="ep-album">EP Album</label>
            </div>
            <div>
              <input type="radio" id="lp-album" name="tipo-album" value="lp" checked={form.tipo === 'lp'} onChange={handleChange} />
              <label htmlFor="lp-album">LP Album</label>
            </div>
            <div>
              <input type="radio" id="single-album" name="tipo-album" value="single" checked={form.tipo === 'single'} onChange={handleChange} />
              <label htmlFor="single-album">Single Album</label>
            </div>
          </fieldset>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}