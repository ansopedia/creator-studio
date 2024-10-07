"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const saveAccessToken = (token: string) => {
  cookies().set({
    name: "accessToken",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
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
    const accessToken = document.cookie.includes("accessToken");
    const refreshToken = document.cookie.includes("refresh-token");
    return !!(accessToken && refreshToken);
  } else if (req) {
    // Server-side check
    const accessToken = req.cookies.get("accessToken");
    const refreshToken = req.cookies.get("refresh-token");
    return !!(accessToken && refreshToken);
  }
  return false;
};
