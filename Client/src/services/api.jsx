const BASE_URL = "http://localhost:8000";

export default async function ApiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong!");
    error.status = response.status;
    throw error;
  }

  return data;
}
