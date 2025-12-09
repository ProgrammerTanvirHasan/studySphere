import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider";
import { apiEndpoint } from "../../../config/api";
import { showInfo } from "../../../utils/toast";
import LoadingSpinner from "../../LoadingSpinner";
import ErrorDisplay from "../../ErrorDisplay";
import BookedEmail from "./bookedEmail/BookedEmail";

const ViewBooked = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["sessionData", email],
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
        "You haven't booked any sessions yet. Browse available sessions and book one to get started!",
        "No Bookings Yet"
      );
    }
  }, [data, isPending]);

  if (isPending) {
    return <LoadingSpinner message="Loading your booked sessions..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  return (
    <div className="py-4">
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        Your booked session
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Here you can see all the sessions you have successfully booked.
      </p>
      {Array.isArray(data) && data.length === 0 ? (
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-2xl text-blue-700 font-bold mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-600 text-center mb-4">
            You haven't booked any sessions yet.
            <br />
            <span className="text-sm text-gray-500">
              Browse available sessions and book one to get started!
            </span>
          </p>
        </div>
      ) : (
        <>
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-2 p-2 container mx-auto">
              {data.map((booked) => (
                <BookedEmail key={booked._id} booked={booked}></BookedEmail>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBooked;
