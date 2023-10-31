import { configureStore } from '@reduxjs/toolkit';

import { topOffSetReducer } from './topOffSetSlice';

export const store = configureStore({ reducer: { topOffSetReducer } });
