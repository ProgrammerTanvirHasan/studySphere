import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiEndpoint } from "../../config/api";

export const fetchMaterials = createAsyncThunk(
  "materials/fetchMaterials",
  async () => {
    const res = await fetch(apiEndpoint("material"), {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch materials: ${res.statusText}`);
    }

    return await res.json();
  }
);

export const deleteMaterial = createAsyncThunk(
  "materials/deleteMaterial",
  async (id) => {
    const res = await fetch(apiEndpoint(`material/${id}`), {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete material: ${res.statusText}`);
    }

    const result = await res.json();
    return { id, result };
  }
);

const materialsSlice = createSlice({
  name: "materials",
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload.id
        );
      });
  },
});
export default materialsSlice.reducer;
