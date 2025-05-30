import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import BookedMaterials from "./BookedMaterials";

const AllStudyMaterials = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const {
    isPending,
    error,
    data = [],
  } = useQuery({
    queryKey: ["bookedSession", email],
    queryFn: () =>
      fetch(`https://stydysphereserver.onrender.com/bookedSession/${email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium animate-pulse">
          Study Materials loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 py-4">
        An error occurred: {error.message}
      </p>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-12">
        <p className="text-red-600 text-center">
          You do not have any booked materials.
          <br />
          <span className="text-sm">(only booked materials here)</span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-cyan-700 text-4xl font-semibold mb-2">
          Your Study Materials
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Below you'll find the study materials provided for each session you've
          booked. Make sure to review them regularly to stay prepared.
        </p>
      </div>

      <div className="grid gap-6">
        {data.map((materials) => (
          <BookedMaterials key={materials._id} materials={materials} />
        ))}
      </div>
    </div>
  );
};

export default AllStudyMaterials;
