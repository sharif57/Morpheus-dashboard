// // redux/features/uploadBooks.js
// import baseApi from "../api/baseApi";

// export const { useUploadBooksMutation } = uploadApi;

import baseApi from "../api/baseApi";

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadBooks: builder.mutation({
      query: (formData) => ({
        url: "/ai/upload/",
        method: "POST",
        body: formData,
        headers: {
          // Include authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      }),
      transformErrorResponse: (response) => {
        // Standardize error response format
        return {
          error: {
            message: response.data?.error || "Upload failed",
            status: response.status,
          },
        };
      },
      invalidatesTags: ["Books"],
    }),

    getBooksList: builder.query({
      query: () => ({
        url: "/ai/book_list/",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
  }),
});

export const { useUploadBooksMutation, useGetBooksListQuery } = uploadApi;
