import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSession = createAsyncThunk("sessions/fetch", async () => {
  const res = await fetch("http://localhost:4001/session/PendingApproved", {
    credentials: "include",
  });
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
