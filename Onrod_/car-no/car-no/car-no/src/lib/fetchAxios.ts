export async function fetchJs<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: unknown,
  header?: HeadersInit
): Promise<response<T>> {
  const response = await fetch("http://127.0.0.1:3000" + url, {
    method,
    headers: header || { "Content-Type": "application/json" },
    body:
      method !== "GET" && method !== "DELETE"
        ? JSON.stringify(data)
        : undefined,
  });
  return response.json();
}
type response<T> = {
  success: boolean;
  message: string;
  error: string;
  data: T;
};

export async function fetchJson<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: FormData
): Promise<response<T>> {
  const response = await fetch("http://127.0.0.1:3000" + url, {
    method,
    body:
      method !== "GET" && method !== "DELETE"
        ? data
        : undefined,
  });
  return response.json();
}
