import { createAsyncThunk } from "@reduxjs/toolkit";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
};

export const fetchProducts = createAsyncThunk(
  "product",
  async (_, { rejectWithValue }): Promise<Product[]> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}`);
      const result = (await response.json()) as Product[];
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw rejectWithValue(error.message);
      } else {
        throw rejectWithValue("An unknown error occurred");
      }
    }
  }
);
