import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../interfaces/Product";

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        product
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to add product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/products/${product.id}`,
        product
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to update product");
    }
  }
);
