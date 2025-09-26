// src/components/Search.jsx (Final)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputBase, Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Estilos (mantidos e aprimorados)
const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: 'var(--input-bg)',
  width: '35%',
  minWidth: '200px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  padding: '5px 15px',
  cursor: 'pointer',
  
  boxShadow: '0 2px 8px var(--shadow-color-dark)',
  transition: 'all 0.3s ease',

  '&:hover': {
    boxShadow: '0 4px 10px var(--shadow-color-light)',
    backgroundColor: 'var(--card-bg)',
  },
  
  '&:focus-within': {
    boxShadow: `0 0 0 2px var(--orange)`, 
    transform: 'scale(1.01)',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: 'var(--input-text-color)',
  padding: '0 10px 0 6px',
  display: 'flex',
  alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'var(--input-text-color)',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '10px 0',
    fontSize: '0.95rem',
  },
  '& ::placeholder': {
    color: 'var(--input-text-color)',
    opacity: 0.8,
  },
}));

function Search() {
  const navigate = useNavigate();
  // NOVO: Estado para armazenar o valor do input
  const [searchTerm, setSearchTerm] = useState(''); 

  // Função centralizada de navegação
  const handleSearchNavigation = () => {
    // Verifica se há algo para pesquisar antes de navegar
    if (searchTerm.trim()) {
      // Navega para /pesquisa, adicionando o valor como parâmetro de consulta (?q=termo)
      navigate(`/pesquisa?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Opcional: Limpa o input após a pesquisa
    } else {
      // Se estiver vazio, apenas navega para a página de pesquisa
      navigate('/pesquisa');
    }
  };

  // 1. Lida com o clique (no container)
  const handleSearchClick = (e) => {
    e.preventDefault(); // Impede qualquer ação de link padrão do container
    handleSearchNavigation();
  };

  // 2. Lida com a digitação (captura o valor)
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 3. Lida com a tecla Enter (no input)
  const handleKeyDown = (event) => {
    // Permite que o Enter dispare a pesquisa
    if (event.key === 'Enter') {
      handleSearchNavigation();
    }
    // Impede que o clique no input navegue, o que não deve acontecer
    event.stopPropagation();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}> 
        {/* Usamos o Box como container para poder manipular o evento de clique */}
        <SearchContainer onClick={handleSearchClick}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm} // NOVO: Conecta o valor ao estado
                onChange={handleInputChange} // NOVO: Atualiza o estado ao digitar
                onKeyDown={handleKeyDown} 
                // CRÍTICO: Impedir que o clique no input acione o handleSearchClick 
                // do container (já que o input é um elemento diferente)
                onClick={(e) => e.stopPropagation()} 
            />
        </SearchContainer>
    </Box>
  );
}

export default Search;