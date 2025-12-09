import AdminSession from "./adminSession/AdminSession";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider";
import { fetchSession } from "../../../features/session";
import { showWarning } from "../../../utils/toast";
import LoadingSpinner from "../../LoadingSpinner";
import ErrorDisplay from "../../ErrorDisplay";

const Session = () => {
  const user = useContext(AuthContext);
  const dispatch = useDispatch();
  const { AllSession, loading, error } = useSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch, user]);

  useEffect(() => {
    if (AllSession && !loading && AllSession.length === 0) {
      showWarning(
        "No sessions found. Tutors need to create sessions first.",
        "No Sessions Available"
      );
    }
  }, [AllSession, loading]);

  if (loading) {
    return <LoadingSpinner message="Loading all sessions..." />;
  }

  if (error) {
    return (
      <ErrorDisplay error={error} onRetry={() => dispatch(fetchSession())} />
    );
  }

  return (
    <div>
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        All study session created by tutor
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Here you can view, approve, or manage sessions submitted by tutors. Only
        admins are authorized to perform these actions.
      </p>

      {AllSession.length > 0 ? (
        <div className="py-4">
          {AllSession.map((session, index) => (
            <AdminSession key={session._id} session={session} index={index} />
          ))}
        </div>
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
            There are no sessions to review yet.
            <br />
            <span className="text-sm text-gray-500">
              Tutors need to create sessions first.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Session;
