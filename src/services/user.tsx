// services/user.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://randomuser.me/" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api?results=10",
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = userApi;
