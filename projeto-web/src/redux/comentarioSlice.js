import { createSlice } from '@reduxjs/toolkit';

// Função auxiliar para gerar um ID simples
const generateId = () => Math.random().toString(36).substring(2, 9);

// O estado inicial será um objeto onde a chave é musicaId e o valor é um array de comentários
const initialState = {};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // Ação para adicionar um novo comentário e inicializar arrays se for primeira linha
    addComment: (state, action) => {
      const { musicaId, texto } = action.payload;

      if (!state[musicaId]) {
        state[musicaId] = [];
      }

      const novoCom = {
        id: generateId(),
        texto: texto.trim(),
        autor: 'Você (Anônimo)', // Nome simulado
        data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR').substring(0, 5),
      };

      // Adiciona o novo comentário ao início do array (mais novo primeiro)
      state[musicaId].unshift(novoCom);
      
    },
    // Você pode adicionar mais ações, como loadComments, removeComment, etc.
  },
});

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;