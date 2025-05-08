import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import BookedMaterials from "./BookedMaterials";
import Swal from "sweetalert2";

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
      fetch(`http://localhost:27017/bookedSession/${email}`, {
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
    Swal.fire({
      title: "No Materials Found",
      text: "Your booked sessions haven't added any study materials yet.",
      icon: "info",
      confirmButtonText: "Go to Home",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
    return null;
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
