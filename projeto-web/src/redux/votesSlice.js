import { createSlice } from '@reduxjs/toolkit';

// O estado inicial armazenará as votações por ID da música.
// Cada música terá a contagem de likes/dislikes e o rating do usuário (1, -1, 0).
/* Exemplo de Estado:
{
  'musica-123': { 
    likes: 15, 
    dislikes: 3, 
    userRating: 0 
  },
  'default-song-placeholder': { ... }
}
*/
const initialState = {
    // Inicializa a música placeholder com valores iniciais para demonstração
    "default-song-placeholder": {
        likes: 15,
        dislikes: 3,
        userRating: 0, // 1: Like, -1: Dislike, 0: Nenhum
    }
};

export const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    // Reducer para atualizar a votação
    toggleVote: (state, action) => {
      const { musicaId, voteType } = action.payload; // voteType será 'like' ou 'dislike'
      
      // Garante que o estado da música exista
      if (!state[musicaId]) {
        state[musicaId] = { likes: 0, dislikes: 0, userRating: 0 };
      }

      const current = state[musicaId];
      const newRating = (voteType === 'like' ? 1 : -1);

      if (current.userRating === newRating) {
        // Ação: Desfazer a votação
        current.userRating = 0;
        current[voteType + 's'] -= 1; 

      } else if (current.userRating === 0) {
        // Ação: Dar a primeira votação
        current.userRating = newRating;
        current[voteType + 's'] += 1;

      } else {
        // Ação: Trocar a votação (Dislike -> Like, ou Like -> Dislike)
        
        // 1. Remove a votação anterior
        const prevVoteType = current.userRating === 1 ? 'likes' : 'dislikes';
        current[prevVoteType] -= 1;

        // 2. Adiciona a nova votação
        current.userRating = newRating;
        current[voteType + 's'] += 1;
      }
    },
    // Adicionar uma ação de inicialização (opcional) se você carregar os dados de uma API
    // initVotes: (state, action) => { ... }
  },
});

export const { toggleVote } = votesSlice.actions;

export default votesSlice.reducer;