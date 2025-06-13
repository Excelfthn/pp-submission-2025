import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const fetchStories = createAsyncThunk("stories/fetchStories", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/stories/1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data; // Only return the story data array
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default storiesSlice.reducer;
