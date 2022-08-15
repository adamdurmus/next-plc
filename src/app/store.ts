import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import artistListReducer from '../modules/Artists/artistListReducer';

export const store = configureStore({
  reducer: {
    artist: artistListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
