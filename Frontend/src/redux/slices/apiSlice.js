import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";

const API_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:8800";

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api`,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const requestUrl =
    typeof args === "string" ? args : args?.url?.toString() || "";

  // Do not log out admin when a protected action fails; only on session/auth loss
  const isAuthEndpoint =
    requestUrl.includes("/login") ||
    requestUrl.includes("/logout") ||
    requestUrl.includes("/register") ||
    requestUrl.includes("/forgot-password");

  if (result.error?.status === 401 && !isAuthEndpoint && api.getState().auth?.user) {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Task", "Notification"],
  endpoints: () => ({}),
});
