import { createSlice } from "@reduxjs/toolkit";
const arr: any[] = [];

const initialState = {
  cartInfo: arr,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartInfo: (state, action) => {
      const exist = state.cartInfo.find((vl) => vl.id == action.payload.id);

      if (exist) {
        exist.qty += action.payload.qty;
      } else {
        state.cartInfo.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      const restOfArr = state.cartInfo.filter((vl) => {
        return vl.id !== action.payload;
      });
      state.cartInfo = restOfArr;
    },
    removeAllProducts: (state) => {
      state.cartInfo = [];
    },
  },
});
export const { cartInfo, removeProduct,removeAllProducts } = cartSlice.actions;
export default cartSlice.reducer;
