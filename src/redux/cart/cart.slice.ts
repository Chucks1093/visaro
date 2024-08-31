import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCartItem } from "../store.utils";
import { Product } from "../products/product.request";

const initialState = {
  cartItems: [] as Product[],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingCartItem = state.cartItems.find(
        (item: Product) => item.id === action.payload.id
      );
      if (existingCartItem) {
        updateCartItem(state, action.payload.id, (item) => ({
          ...item,
          quantity: item.quantity + 1,
        }));
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<Product["id"]>) => {
      state.cartItems = state.cartItems.filter(
        (item: Product) => item.id !== action.payload
      );
    },
    increaseQuantity: (state, action: PayloadAction<Product["id"]>) => {
      updateCartItem(state, action.payload, (item) => ({
        ...item,
        quantity: item.quantity + 1,
      }));
    },
    decreaseQuantity: (state, action: PayloadAction<Product["id"]>) => {
      updateCartItem(state, action.payload, (item) => ({
        ...item,
        quantity: item.quantity > 1 ? item.quantity - 1 : 1,
      }));
    },
    emptyCart: (state) => {
      state.cartItems = [] as Product[];
    },
  },
  selectors: {
    selectCartItems: (state) => state.cartItems,
    selectCartTotalPrice: (state) => {
      let total = 0;
      for (const item of state.cartItems) {
        total = total + item.quantity * item.price/1000;
      }
      return total.toFixed(2);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} = cartSlice.actions;

export const { selectCartItems, selectCartTotalPrice } = cartSlice.selectors;

export default cartSlice.reducer;
