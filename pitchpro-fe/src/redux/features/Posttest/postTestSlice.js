// features/pretest/postTestSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const sendPostTest = createAsyncThunk("posttest/sendPostTest", async ({ id, anxiety_level, status, anxiety_reason }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const method = status ? "PUT" : "POST";
    const response = await fetch(`${API_URL}/post-test/${id}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ anxiety_level, anxiety_reason }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const postTestSlice = createSlice({
  name: "posttest",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetPosttest: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPostTest.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendPostTest.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendPostTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetPosttest } = postTestSlice.actions;
export default postTestSlice.reducer;
