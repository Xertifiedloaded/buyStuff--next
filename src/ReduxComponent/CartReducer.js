'use client'
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  PLACE_ORDER,
  TOGGLE_SIDEBAR,
  SET_LOCATION,
} from "./ReduxStore";

const initialState = {
  cart: [],
  orderPlaced: false,
  selectedLocation: null,
  locationPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the product is already in the cart
      const existingItem = state.cart.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        return {
          // Item is already in the cart, just update the quantity
          ...state,
          cart: state.cart.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          // Item is not in the cart, add it with quantity 1
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.productId !== action.payload),
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case PLACE_ORDER:
      return {
        ...state,
        cart: [],
        orderPlaced: true,
      };
      case SET_LOCATION:
        return {
          ...state,
          selectedLocation: action.payload.exactLocation,
          locationPrice: action.payload.price, 
        };
  
    default:
      return state;
  }
};

export default cartReducer;
