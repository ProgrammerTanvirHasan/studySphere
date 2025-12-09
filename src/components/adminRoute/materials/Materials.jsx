import { useDispatch, useSelector } from "react-redux";
import Material from "./Material";
import { useContext, useEffect } from "react";
import { fetchMaterials } from "../../../features/materials";
import { AuthContext } from "../../../AuthProvider";
import { showWarning } from "../../../utils/toast";
import LoadingSpinner from "../../LoadingSpinner";
import ErrorDisplay from "../../ErrorDisplay";

const Materials = () => {
  const user = useContext(AuthContext);
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.materials);

  useEffect(() => {
    dispatch(fetchMaterials());
  }, [dispatch, user]);

  useEffect(() => {
    if (items && !loading && items.length === 0) {
      showWarning(
        "No materials found. Tutors need to upload materials first.",
        "No Materials Available"
      );
    }
  }, [items, loading]);

  if (loading) {
    return <LoadingSpinner message="Loading all materials..." />;
  }

  if (error) {
    return (
      <ErrorDisplay error={error} onRetry={() => dispatch(fetchMaterials())} />
    );
  }

  return (
    <div>
      <h2 className="text-cyan-700 py-2 text-center text-3xl">All materials</h2>
      <p className="text-center text-gray-600 mb-4">
        View and manage all the materials uploaded by tutors. Admins have access
        to approve and oversee these materials.
      </p>

      {items.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-4 p-4 container mx-auto">
          {items.map((item) => (
            <Material key={item._id} item={item} />
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
            No Materials Found
          </h3>
          <p className="text-gray-600 text-center mb-4">
            There are no materials uploaded yet.
            <br />
            <span className="text-sm text-gray-500">
              Tutors need to upload materials first.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Materials;
