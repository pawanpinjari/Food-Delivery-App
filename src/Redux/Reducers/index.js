import { combineReducers } from 'redux';
// const SET_CART = 'SET_CART';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
// const DELETE_ITEM = 'DELETE_ITEM'; 
const initialState = {
  user: null,
  restId: null,
  token: null,
  isLoggedIn: false,
  cart:[]
};

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
};

const tokenReducer = (state = initialState.token, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.payload;
    default:
      return state;
  }
};

const isLoggedInReducer = (state = initialState.isLoggedIn, action) => {
  switch (action.type) {
    case 'SET_LOGIN_STATUS':
      return action.payload;
    default:
      return state;
  }
};
const restReducer = (state = initialState.restId, action) => {
  switch (action.type) {
    case 'SET_REST':
      return action.payload;
    default:
      return state;
  }
};
const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case 'SET_CART':
      const item = state.findIndex(item => item.id === action.payload.id);

      if (item !== -1) {
        const updated = [...state];
        updated[item].quantity += action.payload.quantity;

        return updated;
      } else {
        return [...state, action.payload];
      }

    case INCREASE_QUANTITY:
      const inc = state.findIndex((item) => item.id === action.payload.id);
      if (inc !== -1) {
        const updatedInc = [...state];
        updatedInc[inc].quantity += 1;
        return updatedInc;
      }
      return state;

    case DECREASE_QUANTITY:
      const Dec = state.findIndex((item) => item.id === action.payload.id);
      if (Dec !== -1 && state[Dec].quantity > 1) {
        const updatedDec = [...state];
        updatedDec[Dec].quantity -= 1;
        return updatedDec;
      }
      return state;
      case 'DELETE_ALL':
        return [];
      case 'DELETE_ITEM':
        const itemIndex = state.findIndex(item => item.id === action.payload.id);
        if (itemIndex !== -1) {
          const updatedCart = [...state.slice(0, itemIndex), ...state.slice(itemIndex + 1)];
          return updatedCart;
        } else {
          return state;
        }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  isLoggedIn: isLoggedInReducer,
  cart:cartReducer,
  restId:restReducer
});

export default rootReducer;
