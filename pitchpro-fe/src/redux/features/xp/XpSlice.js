import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchXp = createAsyncThunk("xp/fetchXp", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user/xp`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const xpSlice = createSlice({
  name: "xp",
  initialState: {
    value: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchXp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchXp.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload?.xp ?? 0;
      })
      .addCase(fetchXp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default xpSlice.reducer;
