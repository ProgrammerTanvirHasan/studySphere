const ErrorDisplay = ({
  error,
  onRetry,
  title = "Oops! Something went wrong",
}) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 space-y-6">
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-red-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-red-700 mb-2">{title}</h3>
        <p className="text-red-600 mb-4">
          {error?.message || error || "An unexpected error occurred"}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
