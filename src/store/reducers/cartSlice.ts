import { createSlice } from "@reduxjs/toolkit";

interface CartItem{
  id: string | number;
  name: string;
  qty: number;
  sum: number;
  price: number;
}

interface CartState{
  items: CartItem[]
}

const initialState: CartState = {
  items:[]
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    //to ADD & increase item
    addItemToCart: (state , action)=>{
      const existingItem = state.items.find((item)=> item.id === action.payload.id);
      console.log(action.payload.price, "in add to cart")
      if (existingItem){
        existingItem.qty += 1;
        existingItem.sum+= action.payload.price;
        console.log(existingItem.sum, "in add to cart")
      } else {
        state.items.push({
          ...action.payload,
          qty:1,
          sum: action.payload.price,
        });
      }
    },

    //to Decrease item
    removeItemFromCart: (state, action)=>{
      const existingItem = state.items.find((item)=> item.id === action.payload.id);

      if (existingItem && existingItem.qty != 1){
        existingItem.qty -= 1;
        existingItem.sum -= action.payload.price;
      } else {
        state.items = state.items.filter(item=>item.id !== action.payload.id

        )
      }
    },

    //to Delete item
    removeProductFromCart: (state, action) => {
        state.items = state.items.filter(
            item => item.id !== action.payload.id
        )
    },

    // empty cart
    emptyCart: (state) => {
        state.items = []
    }
  },
});

export const { addItemToCart, removeItemFromCart, removeProductFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;