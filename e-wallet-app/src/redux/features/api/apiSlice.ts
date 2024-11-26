import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "../../store";
import { addAccessToken, removeAccessToken } from "../../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/api/v1/user/refresh-token",
        method: "POST",
        credentials: "include",
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      const accessToken = (refreshResult.data as { accessToken: string })
        .accessToken;
      api.dispatch(addAccessToken(accessToken));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(removeAccessToken());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["CreditCard"],
  endpoints: () => ({}),
});
