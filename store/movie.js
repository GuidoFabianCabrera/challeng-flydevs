import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
  name: 'movie',

  initialState: {
    movies: [],
  },

  reducers: {
    addMovie: (state, action) => {
      if (!state.movies.includes(action.payload))
        state.movies.push(action.payload);
    },

    removeMovie: (state, action) => {
      const index = state.movies.findIndex((item) => item == action.payload);

      if (index === -1) {
        return;
      }

      state.movies.splice(index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMovie, removeMovie } = movieSlice.actions;

export default movieSlice.reducer;
