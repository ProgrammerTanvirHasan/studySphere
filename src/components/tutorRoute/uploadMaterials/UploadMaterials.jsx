import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import Materials from "./Materials";

const UploadMaterials = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { isPending, error, data } = useQuery({
    queryKey: ["session", "Approved", email],
    queryFn: () =>
      fetch(`http://localhost:27017/session/${email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending)
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium animate-pulse">Please wait...</p>
      </div>
    );
  if (error) return "An error has occurred: " + error.message;

  if (data.length === 0) {
    return (
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
          You do not have any access to show this.
          <br />
          <span className="text-sm">
            (Only authorized can show this section)
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        All Approved materials
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Here you'll find all the materials that have been approved. You can
        review and manage them as needed.
      </p>
      <div className="grid lg:grid-cols-2 gap-4">
        {data.map((material) => (
          <Materials key={material._id} material={material} />
        ))}
      </div>
    </div>
  );
};

export default UploadMaterials;
