import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: {
    email: "",
    userName: "",
  },
  token:""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    registerInfo: (state, action) => {
      state.userInfo = action.payload;
      
    },
    setToken: (state, action) => {
      state.token = action.payload;
      
    }
  },
});
export const { registerInfo,setToken } = authSlice.actions;
export default authSlice.reducer;
