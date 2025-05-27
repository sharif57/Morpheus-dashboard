"use client";

import baseApi from "../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/accounts/signup/",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/accounts/change_password/",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/accounts/resend_otp/",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/accounts/verify_email/",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/accounts/forgot_password/",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("verify")}`,
          },
        };
      },
    }),

    googleLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login/google",
        method: "POST",
        body: data,
      }),
    }),

    facebookLogin: builder.mutation({
      query: ({ accessToken }) => ({
        url: "/auth/login/facebook",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
  useFacebookLoginMutation,
} = authApi;
