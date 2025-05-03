import baseApi from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadBooks: builder.mutation({
      query: (data) => ({
        url: "/ai/upload/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadBooksMutation} = userApi;
