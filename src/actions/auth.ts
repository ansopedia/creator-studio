"use server";

import axios from "axios";

import { IApiResponse, saveAccessToken } from "../lib/server";
import { LoginSchema } from "../types/auth";

// Set default headers outside the function to avoid repetition
axios.defaults.headers.common["Origin"] = "http://localhost:3000";

export const authenticateUser = async (credentials: LoginSchema) => {
  try {
    const { data, headers } = await axios.post<IApiResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
      credentials,
      { timeout: 10000 } // Add a timeout of 10 seconds
    );

    if (data.status === "failed") {
      return data.message;
    }

    const accessToken = headers.authorization;

    saveAccessToken(accessToken);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Something went wrong");
  }
};
