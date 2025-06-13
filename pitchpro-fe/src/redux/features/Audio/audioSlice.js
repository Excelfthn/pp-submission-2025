import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadAudio = createAsyncThunk("audio/uploadAudio", async ({ id, audioBlob, status }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const method = status ? "PUT" : "POST";
    const formData = new FormData();
    formData.append("audio", audioBlob, "recorded_audio.wav");

    const response = await fetch(`${API_URL}/generate/${id}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errorData = errorText ? JSON.parse(errorText) : "Empty error response";
        return rejectWithValue(errorData);
      } catch {
        return rejectWithValue(errorText || "Upload failed");
      }
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    return data;
  } catch (error) {
    console.error("Upload failed:", error);
    return rejectWithValue(error.message || "Upload failed");
  }
});

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadAudio.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadAudio.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadAudio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default audioSlice.reducer;
