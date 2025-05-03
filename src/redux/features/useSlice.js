import baseApi from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: "/accounts/get_user_profile/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    userList: builder.query({
      query: () => ({
        url: "/accounts/all_user_list/",
        method: "GET",
      }),
      providesTags: ["User"],
    })
  }),
});

export const {useUserProfileQuery, useUserListQuery} = userApi;
