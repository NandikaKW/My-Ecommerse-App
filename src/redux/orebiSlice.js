import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
  wishlist: [], // Added wishlist array
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    // Existing cart reducers
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },

    // New wishlist reducers
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.wishlist.find((product) => product._id === item._id);
      
      if (!existingItem) {
        state.wishlist.push(item);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.wishlist = [];
    },

    // Move from wishlist to cart
    moveToCart: (state, action) => {
      const item = state.wishlist.find(
        (item) => item._id === action.payload
      );
      if (item) {
        // Add to cart
        const cartItem = state.products.find(
          (cartItem) => cartItem._id === item._id
        );
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          state.products.push({
            ...item,
            quantity: 1,
            colors: item.color
          });
        }
        // Remove from wishlist
        state.wishlist = state.wishlist.filter(
          (wishlistItem) => wishlistItem._id !== action.payload
        );
      }
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  moveToCart,
} = orebiSlice.actions;
export default orebiSlice.reducer;