export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const SET_CART = 'SET_CART';
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
  });
  
  export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token
  });
  
  export const setLoginStatus = (status) => ({
    type: 'SET_LOGIN_STATUS',
    payload: status
  });
  export const setRest = (restId) => ({
    type: 'SET_REST',
    payload: restId
  });
  
  export const setCart = (id,name,price,image,quantity) => ({
    type: 'SET_CART',
    payload: {
      id,
      name,
      price,
      image,
      quantity
  }
  });
  export const deleteItem = (id) => {
    return {
      type: 'DELETE_ITEM',
      payload: {
        id: id
      }
    };
  };
  export const inc_Qty = (id) => {
    return {
      type: INCREASE_QUANTITY,
      payload: {
        id: id,
      },
    };
  };
  
  export const dec_Qty = (id) => {
    return {
      type: DECREASE_QUANTITY,
      payload: {
        id: id,
      },
    };
  };
  