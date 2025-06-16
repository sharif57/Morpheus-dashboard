// // redux/features/uploadBooks.js
// import baseApi from "../api/baseApi";

// export const { useUploadBooksMutation } = uploadApi;

// import baseApi from "../api/baseApi";

// export const uploadApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URL = "http://192.168.10.99:8000";
// export const uploadApi = createApi({
//   reducerPath: "sessionApi",
//   tagTypes: ["Session"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_URL,
//   }),
//   endpoints: (builder) => ({
//     uploadBooks: builder.mutation({
//       query: (formData) => ({
//         url: "/ai/upload/",
//         method: "POST",
//         body: formData,

//       }),
//       transformErrorResponse: (response) => {
//         // Standardize error response format
//         return {
//           error: {
//             message: response.data?.error || "Upload failed",
//             status: response.status,
//           },
//         };
//       },
//       invalidatesTags: ["Books"],
//     }),

//     getBooksList: builder.query({
//       query: () => ({
//         url: "/ai/book_list/",
//         method: "GET",
//       }),
//       providesTags: ["Books"],
//     }),

//     resetBooks: builder.mutation({
//       query: (data) => ({
//         url: "/ai/reset_model/",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Books"],
//     }),
//   }),
// });

// export const {
//   useUploadBooksMutation,
//   useGetBooksListQuery,
//   useResetBooksMutation,
// } = uploadApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://192.168.10.99:8000";

export const uploadApi = createApi({
  reducerPath: "bookApi",
  tagTypes: ["Books"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // Optionally add headers if needed
    // prepareHeaders: (headers) => {
    //   headers.set("Authorization", `Bearer ${token}`);
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    uploadBooks: builder.mutation({
      query: (formData) => ({
        url: "/ai/upload/",
        method: "POST",
        body: formData,
      }),
      transformErrorResponse: (response) => ({
        error: {
          message: response.data?.error || "Upload failed",
          status: response.status,
        },
      }),
      invalidatesTags: ["Books"],
    }),

    getBooksList: builder.query({
      query: ({ email }) => ({
        url: `/ai/book_list/?email=${encodeURIComponent(email)}`,
        // /ai/book_list/?email=coder.saidul@gmail.com
        method: "GET",
      }),
      providesTags: ["Books"],
    }),

    resetBooks: builder.mutation({
      query: () => ({
        url: "/ai/reset_model/",
        method: "POST",
      }),
      invalidatesTags: ["Books"],
    }),

    // deleteBooks:builder.mutation({
    //   query: (body) => ({
    //     url: '/ai/delete_books/',
    //     method: "DELETE",
    //     data:body
    //   }),
    //   invalidatesTags: ["Books"],
    // })
    deleteBooks: builder.mutation({
      query: (body) => ({
        url: "/ai/delete_books/",
        method: "DELETE",
        body: body, // Changed from 'data' to 'body'
        headers: {
          "Content-Type": "application/json", // Explicitly set content type
        },
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useUploadBooksMutation,
  useGetBooksListQuery,
  useResetBooksMutation,
  useDeleteBooksMutation,
} = uploadApi;
