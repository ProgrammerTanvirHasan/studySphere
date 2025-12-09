const LoadingSpinner = ({ message = "Loading...", size = "lg" }) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${
              sizeClasses[size === "lg" ? "md" : "sm"]
            } border-4 border-cyan-100 border-t-cyan-400 rounded-full animate-spin animate-reverse`}
          ></div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xl font-semibold text-cyan-700 animate-pulse">
          {message}
        </p>
        <p className="text-sm text-gray-500">Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
