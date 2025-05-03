import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_IMAGE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");

      // console.log("Current token:", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // console.log("Prepared headers:", headers);
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Transaction",
    "Products",
    "SellProduct",
    "Blogs",
    "Notification",
    "Question",
    "Orders",
    "Setting",
    "Review",
    "Buy",
    "Product-info",
  ], // Added all necessary tags
  endpoints: () => ({}),
});

export default baseApi;
