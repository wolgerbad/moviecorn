import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  series: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add(state, action) {
      if (action.payload.isMovie) {
        state.movies.push(action.payload.item);
      } else state.series.push(action.payload.item);
    },
    remove(state, action) {
      if (action.payload.isMovie) {
        state.movies = state.movies.filter(
          (mov) => mov.id !== action.payload.id
        );
      } else
        state.series = state.series.filter((s) => s.id !== action.payload.id);
    },
  },
});

export default favoritesSlice.reducer;

export const { add, remove } = favoritesSlice.actions;
