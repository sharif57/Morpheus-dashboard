import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import { uploadApi } from "./features/uploadBooks";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware).concat(uploadApi.middleware),
});

export default store;