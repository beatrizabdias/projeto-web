import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    // If the user presses "Enter"
    if (event.key === 'Enter') {
      if (searchValue.trim()) {
        navigate(`/pesquisa/${searchValue.trim()}`);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <TextField
        id="search-bar"
        label="Buscar..."
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleSearch}
        sx={{
          // Set responsive width
          width: { xs: '150px', sm: '250px', md: '300px' },
          '& .MuiInputBase-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: 'transparent' },
            '&.Mui-focused fieldset': { borderColor: '#ff6b00' },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '& .MuiInputBase-input': {
            color: '#fff',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                aria-label="buscar" 
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                onClick={() => searchValue.trim() && navigate(`/pesquisa/${searchValue.trim()}`)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBar;