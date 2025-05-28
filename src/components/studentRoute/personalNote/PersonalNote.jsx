import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PersonalNote = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const {
    isPending,
    error,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["storeData", email],
    queryFn: () =>
      fetch(`https://stydysphereserver.onrender.com/stored/email/${email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending)
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium animate-pulse">
          Loading your note...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-4">
        An error has occurred: {error.message}
      </p>
    );

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This note will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://stydysphereserver.onrender.com/stored/${_id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your note has been deleted.", "success");
            refetch();
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete the note.", "error");
          });
      }
    });
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-12">
        <p className="text-red-600 text-center">
          You do not have any note.
          <br />
          <span className="text-sm">(only can show your personal note)</span>
        </p>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-cyan-700 text-4xl font-semibold mb-2">
          Your Stored Personal Notes
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Here you can view, update, or delete the notes you’ve saved. Keep
          track of your thoughts and important information all in one place.
        </p>
      </div>

      <div className="grid gap-6">
        {data.map((note) => (
          <div
            key={note._id}
            className="bg-white shadow-md rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {note.title}
            </h3>
            <p className="text-gray-600 mb-4 whitespace-pre-wrap">
              {note.note}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={`/update/${note._id}`}>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(note._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalNote;
