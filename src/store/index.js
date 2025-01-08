import {configureStore} from '@reduxjs/toolkit';
import CounterReducer from './counterSlice';
import UserReducer from './userReducer';
export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    user: UserReducer,
  },
});
