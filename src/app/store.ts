import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

const templateReducer = (state: number = 0):number =>  {
  return state;
}

export const store = configureStore({
  reducer: {
    default: templateReducer
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
