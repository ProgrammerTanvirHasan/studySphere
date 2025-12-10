export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://stydy-sphere-server.vercel.app";

export const apiEndpoint = (path) => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

export default API_BASE_URL;
