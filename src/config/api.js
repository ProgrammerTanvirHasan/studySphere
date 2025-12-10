const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;

  // If environment variable is set (from build command or .env), use it
  if (envUrl) {
    // Ensure URL has protocol
    if (!envUrl.startsWith("http://") && !envUrl.startsWith("https://")) {
      return `https://${envUrl}`;
    }
    return envUrl;
  }

  // Default fallback: Vercel server URL (no .env file needed)
  return "https://stydy-sphere-server.vercel.app";
};

export const API_BASE_URL = getApiUrl();

export const apiEndpoint = (path) => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

export default API_BASE_URL;
