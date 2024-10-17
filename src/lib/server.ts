"use server";

import { cookies } from "next/headers";

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
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

export const getRefreshToken = async () => {
  return cookies().get("refresh-token")?.value;
};

export const getAccessToken = async () => {
  return cookies().get("access-token")?.value;
};

export interface IApiResponse<T = undefined> {
  response: Response;
  statusCode: number;
  status: "success" | "failed";
  message: string;
  data: T;
}

export const isLoggedIn = async (): Promise<boolean> => {
  if (typeof window !== "undefined") {
    return !!(document.cookie.includes("access-token") && document.cookie.includes("refresh-token"));
  } else {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    return !!(accessToken && refreshToken);
  }
};
