"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const saveAccessToken = (token: string) => {
  cookies().set({
    name: "access-token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

export const saveRefreshToken = (token: string) => {
  cookies().set({
    name: "refresh-token",
    value: token,
  });
};

export interface IApiResponse<T = undefined> {
  response: Response;
  statusCode: number;
  status: "success" | "failed";
  message: string;
  data: T;
}

export const isLoggedIn = (req?: NextRequest): boolean => {
  if (typeof window !== "undefined") {
    // Client-side check
    const accessToken = document.cookie.includes("access-token");
    const refreshToken = document.cookie.includes("refresh-token");
    return !!(accessToken && refreshToken);
  } else if (req) {
    // Server-side check
    const accessToken = req.cookies.get("access-token");
    const refreshToken = req.cookies.get("refresh-token");
    return !!(accessToken && refreshToken);
  }
  return false;
};
