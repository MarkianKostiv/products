// src/functions/deleteProduct.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../interfaces/Product";

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue("Failed to delete product");
    }
  }
);
