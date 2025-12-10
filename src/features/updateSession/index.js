import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchupdateSession = createAsyncThunk(
  "updateSession/updateSessionSlice",
  async ({ _id, updateData }) => {
    const res = await fetch(
      `https://stydy-sphere-server.vercel.app/session/${_id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
        credentials: "include",
      }
    );
    const result = await res.json();
    return { _id, updateData, result };
  }
);

const updateSession = createSlice({
  name: "updateSession",
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchupdateSession.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchupdateSession.fulfilled, (state, action) => {
        state.loading = false;
        const { _id, updateData } = action.payload;
        const index = state.items.findIndex((item) => item._id === _id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...updateData,
          };
        }
      })

      .addCase(fetchupdateSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default updateSession.reducer;
