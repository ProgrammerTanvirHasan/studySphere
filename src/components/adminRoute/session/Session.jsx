import { useQuery } from "@tanstack/react-query";
import AdminSession from "./adminSession/AdminSession";

const Session = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["PendingApproved"],
    queryFn: () =>
      fetch("http://localhost:27017/session/PendingApproved", {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        All study session created by tutor
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Here you can view, approve, or manage sessions submitted by tutors. Only
        admins are authorized to perform these actions.
      </p>

      {data.length > 0 ? (
        <div className="py-4">
          {data.map((session, index) => (
            <AdminSession
              key={session._id}
              session={session}
              refetch={refetch}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 3a9 9 0 100 18 9 9 0 000-18z"
            />
          </svg>
          <h3 className="text-2xl text-red-600 font-semibold mb-2">
            Access Denied
          </h3>
          <p className="text-gray-600 text-center">
            You do not have permission to view these sessions.
            <br />
            <span className="text-sm">
              (Only admins can access this section)
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Session;
