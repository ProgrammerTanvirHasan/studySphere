import User from "./user/User";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { fetchProducts } from "../../../features/dashboardUsers";
import { AuthContext } from "../../../AuthProvider";
import { showWarning } from "../../../utils/toast";
import LoadingSpinner from "../../LoadingSpinner";
import ErrorDisplay from "../../ErrorDisplay";

const Users = () => {
  const user = useContext(AuthContext);
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.dashboardUsers
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, user]);

  useEffect(() => {
    if (items && !loading && items.length === 0) {
      showWarning(
        "No users found in the system. This might indicate a database connection issue.",
        "No Users Found"
      );
    }
  }, [items, loading]);

  if (loading) {
    return <LoadingSpinner message="Loading all users..." />;
  }

  if (error) {
    return (
      <ErrorDisplay error={error} onRetry={() => dispatch(fetchProducts())} />
    );
  }

  return (
    <div>
      <h2 className="text-3xl text-cyan-700 text-center py-2">
        All users here
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Below is a list of all registered users in the system. Only admins have
        permission to view and manage this data.
      </p>

      {items.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-4 mt-8">
          {items?.map((users) => (
            <User key={users._id} users={users}></User>
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl text-gray-700 font-bold mb-2">
            No Users Found
          </h3>
          <p className="text-gray-600 text-center mb-4">
            There are no users registered in the system yet.
            <br />
            <span className="text-sm text-gray-500">
              Users will appear here once they register.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Users;
