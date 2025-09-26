import React, { useState } from 'react';
// Importe seu CSS aqui se estiver usando um bundler como Webpack/Vite
// import '../css/criar_musica.css'; 

const generosLista = [
    "Clássica", "Country", "Eletrônica", "Forró", "Funk", "Gótico", 
    "Hip Hop", "Instrumental", "Jazz", "Metal", "MPB", "Ópera", 
    "Pagode", "Pop", "Punk", "Rap", "Rock", "Sertanejo"
];

function UploadMusica() {
    // 1. **ESTADO**: Use useState para gerenciar os dados do formulário
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        creditos: '',
        album: 'nada',
        generos: [],
        // Nota: O gerenciamento de arquivos (música/imagem) é mais complexo e requer o tipo 'file'
    });

    // 2. **MANUSEIO DE MUDANÇAS**: Função para atualizar o estado quando o usuário digita
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                generos: checked
                    ? [...prevData.generos, value] // Adiciona o gênero
                    : prevData.generos.filter(g => g !== value) // Remove o gênero
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    // 3. **MANUSEIO DE SUBMISSÃO**: Função para enviar o formulário
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita o recarregamento da página
        console.log("Dados do Formulário:", formData);
        // Aqui você faria a chamada à API (POST request) para o backend
        alert("Formulário submetido! Verifique o console para os dados.");
    };

    // 4. **RENDERIZAÇÃO (JSX)**
    return (
        <form className="musicaform" onSubmit={handleSubmit}>
            
            <div className="container">
                <h1 className="titulo">Upload de Música</h1>
            </div>

            <div className="container">
                <label>Enviar arquivo:</label>
                {/* No HTML puro, o botão forçava o upload. 
                    No React/HTML, usamos o input 'file' escondido. 
                    Porém, para manter a estrutura original, usaremos um input "simulado" (type="button")
                */}
                <button type="button" className="botao laranja">Fazer Upload</button>
                
                <label>Enviar imagem da música:</label>
                <button type="button" className="botao laranja">Escolha do seu Dispositivo</button>

                <label htmlFor="nome">Nome da Música:</label>
                <input 
                    type="text" 
                    className="caixatexto" 
                    id="nome" // Mudança de nomemusica para nome (mais simples)
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                />
                
                <label htmlFor="descricao">Descrição:</label>
                <input 
                    type="text" 
                    className="caixatexto" 
                    id="descricao" 
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                />
                
                <label htmlFor="creditos">Créditos:</label>
                <input 
                    type="text" 
                    className="caixatexto" 
                    id="creditos" 
                    name="creditos"
                    value={formData.creditos}
                    onChange={handleChange}
                />

                <label htmlFor="album">Álbum:</label>
                <select 
                    name="album" 
                    id="album" 
                    className="caixatexto"
                    value={formData.album}
                    onChange={handleChange}
                >
                    <option value="nada">---</option>
                    <option value="artista">[Álbum do Artista]</option>
                    {/* Aqui você faria um .map() se estivesse carregando álbuns de uma API */}
                </select>

                <h3 className="titulo"><strong>Gêneros:</strong></h3> 
            </div>

            {/* Div para os Checkboxes de Gêneros */}
            <div className="colunas">
                {generosLista.map(genero => (
                    <label className="cont" key={genero}>
                        {genero}
                        <input 
                            type="checkbox" 
                            value={genero.toLowerCase().replace(/\s/g, '')} // Valor minúsculo e sem espaço
                            onChange={handleChange}
                            checked={formData.generos.includes(genero.toLowerCase().replace(/\s/g, ''))}
                        />
                        <span className="check"></span>
                    </label>
                ))}
            </div>

            <button type="submit" className="botao laranja">Enviar</button>
        </form>
    );
}

export default UploadMusica;