import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider";
import { apiEndpoint } from "../../../config/api";
import { showInfo } from "../../../utils/toast";
import LoadingSpinner from "../../LoadingSpinner";
import ErrorDisplay from "../../ErrorDisplay";
import BookedMaterials from "./BookedMaterials";

const AllStudyMaterials = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const {
    isPending,
    error,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["bookedSession", email],
    enabled: !!email,
    queryFn: () => {
      const normalizedEmail = email?.toLowerCase().trim();
      return fetch(
        apiEndpoint(`bookedSession/${encodeURIComponent(normalizedEmail)}`),
        {
          credentials: "include",
        }
      ).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch booked sessions: ${res.statusText}`);
        }
        return res.json();
      });
    },
  });

  useEffect(() => {
    if (data && !isPending && Array.isArray(data) && data.length === 0) {
      showInfo(
        "You haven't booked any sessions yet. Book a session to access study materials!",
        "No Study Materials"
      );
    }
  }, [data, isPending]);

  if (isPending) {
    return <LoadingSpinner message="Loading your study materials..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  const bookedSessions = Array.isArray(data) ? data : [];

  if (bookedSessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg max-w-md mx-auto">
        <div className="bg-blue-200 rounded-full p-6 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-2xl text-blue-700 font-bold mb-2">
          No Study Materials
        </h3>
        <p className="text-gray-600 text-center mb-4">
          You haven't booked any sessions yet.
          <br />
          <span className="text-sm text-gray-500">
            Book a session to access study materials!
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-cyan-700 text-4xl font-semibold mb-2">
          Your Study Materials
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Below you'll find the study materials provided for each session you've
          booked. Make sure to review them regularly to stay prepared.
        </p>
      </div>

      <div className="grid gap-6">
        {bookedSessions.map((session) => (
          <BookedMaterials key={session._id} materials={session} />
        ))}
      </div>
    </div>
  );
};

export default AllStudyMaterials;
