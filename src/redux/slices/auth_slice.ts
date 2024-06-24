import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isvisible: false,
  message: "",
  type: "success",
};

export const authSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    google: (state, action) => {
      state.isvisible = action.payload;
    },
  },
});
export const { google } = authSlice.actions;
export default authSlice.reducer;
