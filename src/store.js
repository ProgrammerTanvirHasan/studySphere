import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products";
import tutorReducer from "./features/tutor";
import usersReducer from "./features/dashboardUsers";
import sessionReducer from "./features/session";
import updateSessionReducer from "./features/updateSession";
import materialsReducer from "./features/materials";

export const store = configureStore({
  reducer: {
    products: productReducer,
    tutors: tutorReducer,
    dashboardUsers: usersReducer,
    sessions: sessionReducer,
    updateSession: updateSessionReducer,
    materials: materialsReducer,
  },
});
