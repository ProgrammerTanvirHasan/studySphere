import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiEndpoint } from "../../config/api";

export const fetchSession = createAsyncThunk("sessions/fetch", async () => {
  const res = await fetch(apiEndpoint("session/PendingApproved"), {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch sessions: ${res.statusText}`);
  }

  return await res.json();
});

const sessions = createSlice({
  name: "sessions",
  initialState: { AllSession: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchSession.fulfilled, (state, action) => {
        state.loading = false;
        state.AllSession = action.payload;
      })

      .addCase(fetchSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default sessions.reducer;
