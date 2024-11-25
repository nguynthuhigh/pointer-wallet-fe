import { apiSlice } from "../api/apiSlice";
import { IProfile } from "./profile";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IProfile, void>({
      query: () => "/api/v1/user/profile",
      keepUnusedDataFor: 20,
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
