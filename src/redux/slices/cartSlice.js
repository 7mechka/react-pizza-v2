import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      let isFound = false;
      state.forEach((e, i) => {
        if (
          e.title === action.payload.title &&
          e.type === action.payload.type &&
          e.size === action.payload.size
        ) {
          e.amount += 1;
          e.price = e.basePrice * e.amount;
          isFound = true;
        }
      });
      if (!isFound) {
        state.push({
          title: action.payload.title,
          type: action.payload.type,
          size: action.payload.size,
          price: action.payload.price,
          basePrice: action.payload.price,
          amount: 1,
        });
      }
    },
    removePizza(state, action) {
      state.forEach((e, i) => {
        if (
          e.title === action.payload.title &&
          e.type === action.payload.type &&
          e.size === action.payload.size
        ) {
          if (action.payload.action === 'removeOne') {
            if (e.amount >= 2) {
              e.amount -= 1;
              e.price = e.basePrice * e.amount;
            } else {
              state.splice(i, 1);
            }
          } else if (action.payload.action === 'addOne') {
            e.amount += 1;
            e.price = e.basePrice * e.amount;
          } else if (action.payload.action === 'deleteItem') {
            state.splice(i, 1);
          }
        }
      });
    },
    clearList(state) {
      state.length = 0;
    },
  },
});

export const { addPizza, removePizza, clearList } = cartSlice.actions;

export default cartSlice.reducer;
