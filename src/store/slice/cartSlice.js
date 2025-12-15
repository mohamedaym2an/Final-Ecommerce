import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "./userSlice";

const initialState = {
  cartId: null,
  products: [],
  loading: true,
  totalPrice: 0,
};

const updateCartId = (state, newCartId) => {
  state.cartId = newCartId;
};

const getTotalPrice = (state) => {
  if (state.products.length > 0) {
    const totalPrice = state.products.reduce(
      (prev, curr) => prev + curr.count * curr.price,
      0
    );
    state.totalPrice = totalPrice;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.products = action.payload.products;
      state.cartId = action.payload?.cartId || null;
      state.loading = false;
      getTotalPrice(state);
    },

    clearCart: (state) => {
      state.cartId = null;
      state.products = [];
      state.totalPrice = 0;
    },

    addProductToCart: (state, action) => {
      if (state.products.length > 0) {
        const isFound = state.products.findIndex(
          (product) => product.product._id === action.payload.data.product._id
        );

        if (isFound !== -1) {
          state.products[isFound].count += 1;
          getTotalPrice(state);
          updateCartId(state, action.payload.cartId);
          return;
        }
      }
      state.products = [...state.products, action.payload.data];
      getTotalPrice(state);
      updateCartId(state, action.payload.cartId);
    },

    updateProduct: (state, action) => {
      const findIndex = state.products.findIndex(
        (product) => product.product._id === action.payload.id
      );
      if (findIndex === -1) return;
      state.products[findIndex].count = action.payload.count;
      getTotalPrice(state);
    },

    removeProductFromCart: (state, action) => {
      if (!state.products.length) return;
      const filterCart = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.products = filterCart;
      getTotalPrice(state);
      if (!state.products.length) {
        state.totalPrice = 0;
        state.cartId = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state) => {
      state.products = [];
      state.totalPrice = 0;
    });
  },
});

export const {
  setCart,
  clearCart,
  addProductToCart,
  removeProductFromCart,
  updateProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
