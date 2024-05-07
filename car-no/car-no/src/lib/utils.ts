import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkRole = ()  : 'buyer' | 'seller' | 'expert' | null => {
  const user = sessionStorage.getItem("user");
  if (user) {
    const data = JSON.parse(user);
    if (data.role) {
      return data.role;
    }
  }
  sessionStorage.clear();
  return null;
}