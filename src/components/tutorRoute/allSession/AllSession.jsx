import { useQuery } from "@tanstack/react-query";
import Sessions from "./sessions/Sessions";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider";
import { apiEndpoint } from "../../../config/api";
import { showWarning } from "../../../utils/toast";
import LoadingSpinner from "../../LoadingSpinner";
import ErrorDisplay from "../../ErrorDisplay";

const AllSession = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["session", email],
    enabled: !!email,
    queryFn: () => {
      const normalizedEmail = email?.toLowerCase().trim();
      return fetch(
        apiEndpoint(`session/email/${encodeURIComponent(normalizedEmail)}`),
        {
          credentials: "include",
        }
      ).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch sessions: ${res.statusText}`);
        }
        return res.json();
      });
    },
  });

  useEffect(() => {
    if (data && !isPending && Array.isArray(data) && data.length === 0) {
      showWarning(
        "You haven't created any sessions yet. Start by creating your first session!",
        "No Sessions Found"
      );
    }
  }, [data, isPending]);

  if (isPending) {
    return <LoadingSpinner message="Loading your sessions..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }
  const sessions = Array.isArray(data) ? data : [];

  return (
    <div>
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        All session that you created
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Below are the sessions that you have created. You can view, update, or
        delete them. Make sure to keep track of your active sessions.
      </p>
      {sessions.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-2 gap-4 ">
            {sessions.map((session) => (
              <Sessions
                key={session._id}
                session={session}
                refetch={refetch}
              ></Sessions>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-12 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg max-w-md mx-auto">
          <div className="bg-gray-200 rounded-full p-6 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-400"
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
          <h3 className="text-2xl text-gray-700 font-bold mb-2">
            No Sessions Found
          </h3>
          <p className="text-gray-600 text-center mb-4">
            You haven't created any sessions yet.
            <br />
            <span className="text-sm text-gray-500">
              Start by creating your first session!
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AllSession;
