export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const PLACE_ORDER = 'PLACE_ORDER';
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const SET_LOCATION = 'SET_LOCATION'; 
// this is my action or storekeeper
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const increaseQuantity = (itemId) => ({
  type: INCREASE_QUANTITY,
  payload: itemId,
});

export const decreaseQuantity = (itemId) => ({
  type: DECREASE_QUANTITY,
  payload: itemId,
});

export const placeOrder = () => ({
  type: PLACE_ORDER,
});


export const setLocation = (location) => ({
  type: SET_LOCATION,
  payload: location,
});


export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});
export const openSidebar = () => ({
  type: OPEN_SIDEBAR,
});

export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR,
});

