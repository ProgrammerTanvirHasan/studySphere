import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider";
import { apiEndpoint } from "../../../config/api";
import { showWarning } from "../../../utils/toast";
import LoadingSpinner from "../../LoadingSpinner";
import ErrorDisplay from "../../ErrorDisplay";
import UpdateMaterials from "./UpdateMaterials";

const ViewMaterials = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["material", email],
    enabled: !!email,
    queryFn: () => {
      const normalizedEmail = email?.toLowerCase().trim();
      return fetch(
        apiEndpoint(`material/${encodeURIComponent(normalizedEmail)}`),
        {
          credentials: "include",
        }
      ).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch materials: ${res.statusText}`);
        }
        return res.json();
      });
    },
  });

  useEffect(() => {
    if (data && !isPending && Array.isArray(data) && data.length === 0) {
      showWarning(
        "You don't have any materials uploaded yet. Upload materials for your approved sessions.",
        "No Materials Found"
      );
    }
  }, [data, isPending]);

  if (isPending) {
    return <LoadingSpinner message="Loading your materials..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  const materials = Array.isArray(data) ? data : [];

  if (materials.length === 0) {
    return (
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
          You haven't uploaded any materials yet.
          <br />
          <span className="text-sm text-gray-500">
            Upload materials for your approved sessions to get started.
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        You can update or delete these materials
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Feel free to make changes to your materials or remove them as needed.
        Simply choose the action you wish to take.
      </p>
      <div className="grid lg:grid-cols-2 container mx-auto gap-4">
        {materials.map((material) => (
          <UpdateMaterials
            key={material._id}
            materials={material}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewMaterials;
