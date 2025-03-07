import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProductsThunk",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productsSlice.reducer;
