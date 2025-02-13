import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PersonalNote = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["storeData", email],
    queryFn: () =>
      fetch(`http://localhost:4000/stored/email/${email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/stored/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            console.error("Error deleting note:", error);
            Swal.fire("Error", "Failed to delete the note.", "error");
          });
      }
    });
  };

  return (
    <div className=" max-w-full min-h-screen">
      <h2 className="bg-orange-400 py-2 text-center text-white text-xl mb-8">
        Personal Note That You Stored
      </h2>
      {data.length === 0 ? (
        Swal.fire({
          title: "No data found",
          text: "You have ho any created note! ",
          icon: "question",
          confirmButtonText: "Go to Home",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        })
      ) : (
        <div className="px-4">
          {data.map((note) => (
            <div
              className=" border-b-4 border-orange-300  p-6 mb-4 bg-slate-700 "
              key={note._id}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl text-white">
                Title: {note.title}
              </h2>
              <p className="text-white text-sm mb-2">{note.note}</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link to={`/update/${note._id}`}>
                  <button className="btn bg-green-700 text-white w-full sm:w-auto">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="btn bg-red-800 text-white w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalNote;
