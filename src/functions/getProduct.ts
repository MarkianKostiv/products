import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../interfaces/Product";

export const getProduct = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(
      "http://localhost:5000/products"
    );
    return response.data;
  }
);
