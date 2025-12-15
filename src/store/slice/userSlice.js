import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("loginUser")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("loginUser", JSON.stringify(action.payload));
    },

    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("loginUser");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
