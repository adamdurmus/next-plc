import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getArtists } from './artistListAPI';
import { ArtistList, SearchParams } from './types';


export interface ArtistState {
  value: ArtistList | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ArtistState = {
  value: undefined,
  status: 'idle',
};
export const getArtistsAsync = createAsyncThunk(
  'artist/fetchCount',
  async (searchParams: SearchParams) => {
    const response = await getArtists(searchParams);
    return response.data;
  }
);

export const artistListSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArtistsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getArtistsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getArtistsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectArtistList = (state: RootState) => state.artist.value;

export default artistListSlice.reducer;
