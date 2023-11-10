import { combineReducers } from 'redux';
import { tasklistSlice } from 'app/slices';

export const reducer = combineReducers({ tasklist: tasklistSlice.reducer });
