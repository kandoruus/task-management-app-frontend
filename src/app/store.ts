import { configureStore, ThunkAction, Action, Store } from '@reduxjs/toolkit';
import { reducer } from 'app/reducer';
import thunk from 'redux-thunk';

export const store = configureStore({ reducer, middleware: [thunk] });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
