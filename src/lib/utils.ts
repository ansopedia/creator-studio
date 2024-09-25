import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line func-style
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
