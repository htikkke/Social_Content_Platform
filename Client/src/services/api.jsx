const BASE_URL = "http://localhost:8000";

export default async function ApiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.message ||
        "Registration failed.Username or email or password may already exist!",
    );
  }
  return data;
}
