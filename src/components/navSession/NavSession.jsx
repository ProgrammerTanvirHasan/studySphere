import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock, DollarSign, CheckCircle } from "lucide-react";

const NavSession = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["sessionData"],
    queryFn: () =>
      fetch("https://stydy-sphere-server.vercel.app/session", {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isLoading)
    return (
      <div className="text-center">
        <div className="text-center">
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
            <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
            <p className="text-lg font-medium animate-pulse">
              Finding all session...
            </p>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">Error fetching sessions</div>
    );

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-indigo-600 mb-3">
          🎓 All Study Sessions
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Join exciting sessions led by expert mentors. Sharpen your skills and
          grow your career with hands-on learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data.map((session) => (
          <div
            key={session._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                {session.title}
              </h3>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  session.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {session.status}
              </span>
            </div>

            <p className="text-gray-600 mb-4 text-sm">{session.textarea}</p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                <span>Fee: ${session.amount}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Duration: {session.duration} mins</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>
                  From: {new Date(session.classStart).toLocaleDateString()} to{" "}
                  {new Date(session.classEnd).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Instructor: {session.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavSession;
