// features/pretest/preTestSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const sendPreTest = createAsyncThunk("pretest/sendPreTest", async ({ id, anxiety_level,status, anxiety_reason }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const method = status ? "PUT" : "POST";
    const response = await fetch(`${API_URL}/pre-test/${id}`, {
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
  

const preTestSlice = createSlice({
  name: "pretest",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetPretest: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPreTest.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendPreTest.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendPreTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetPretest } = preTestSlice.actions;
export default preTestSlice.reducer;

