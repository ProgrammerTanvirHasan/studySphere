import User from "./user/User";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { fetchProducts } from "../../../features/dashboardUsers";
import { AuthContext } from "../../../AuthProvider";

const Users = () => {
  const user = useContext(AuthContext);
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.dashboardUsers
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, user]);

  if (loading)
    return (
      <div className="text-center">
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
          <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
          <p className="text-lg font-medium animate-pulse">
            Finding all user...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center mt-10">
        An error has occurred: {error.message || "Unknown error"}
      </div>
    );

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
            You do not have permission to view this page.
            <br />
            <span className="text-sm">(Admin access required)</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Users;
