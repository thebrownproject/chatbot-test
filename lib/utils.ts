import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Essential function for combining CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate unique IDs for messages
export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Get most recent user message from array
export function getMostRecentUserMessage(messages: Array<{ role: string }>) {
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages.at(-1);
}

// Clean up message text (simplified version)
export function sanitizeText(text: string) {
  return text.replace("<has_function_call>", "");
}

// Safe localStorage access
export function getLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      return [];
    }
  }
  return [];
}

// Set localStorage safely
export function setLocalStorage(key: string, value: any) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore localStorage errors
    }
  }
}
