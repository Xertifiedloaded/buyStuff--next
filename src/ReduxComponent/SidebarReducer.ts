
import { OPEN_SIDEBAR,CLOSE_SIDEBAR } from "./ReduxStore";

const initialState = {
  isOpen: false,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return { ...state, isOpen: true };
    case CLOSE_SIDEBAR:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default sidebarReducer;