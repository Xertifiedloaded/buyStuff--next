import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartReducer';
import sidebarReducer from './SidebarReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    sidebar: sidebarReducer
  },
});

export default store;