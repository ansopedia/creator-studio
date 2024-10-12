"use server";

import axios from "axios";

import { IApiResponse, saveAccessToken, saveRefreshToken } from "../lib/server";
import { LoginSchema } from "../types/auth";

// Set default headers and validation
axios.defaults.headers.common["Origin"] = "http://localhost:3000";
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

// Helper function to extract token from Set-Cookie header
export const extractTokenFromCookie = (
  setCookieHeader: string | string[] | undefined,
  tokenName: string
): string | undefined => {
  if (!setCookieHeader) return undefined;

  // Ensure setCookieHeader is an array
  const cookiesArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];

  for (const cookie of cookiesArray) {
    const match = cookie.match(new RegExp(`${tokenName}=([^;]+)`));
    if (match) {
      return match[1];
    }
  }

  return undefined;
};

export const authenticateUser = async (credentials: LoginSchema) => {
  try {
    const { data, headers } = await axios.post<IApiResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
      credentials
    );

    const accessToken = headers.authorization;
    const refreshToken = extractTokenFromCookie(headers["set-cookie"], "refresh-token");

    if (accessToken && refreshToken) {
      saveAccessToken(accessToken);
      saveRefreshToken(refreshToken);
    }

    return data;
  } catch (error) {
    throw axios.isAxiosError(error) ? new Error("Internal server error") : new Error("Failed to authenticate user");
  }
};
