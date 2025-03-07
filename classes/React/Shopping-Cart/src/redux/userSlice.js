import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// slicename/thunkname
export const fetchUserThunk = createAsyncThunk(
  "user/fetchUserThunk",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/users/1");
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
