import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/Product";
import { getProduct } from "../../functions/getProduct";
import { deleteProduct } from "../../functions/deleteProduct";
import { addProduct, updateProduct } from "../../functions/productThunks";

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProduct.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products = state.products.map((product) =>
            product.id === action.payload.id ? action.payload : product
          );
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (product) => product.id !== action.payload
          );
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
