import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "./userSlice";

const initialState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.products = action.payload;
    },

    addProductToWishlist: (state, action) => {
      state.products = [...state.products, action.payload];
    },

    removeProductFromWishlist: (state, action) => {
      const filterState = state.products.filter(
        (i) => i._id !== action.payload
      );
      state.products = filterState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state) => {
      state.products = [];
    });
  },
});

export const { setWishlist, addProductToWishlist, removeProductFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
