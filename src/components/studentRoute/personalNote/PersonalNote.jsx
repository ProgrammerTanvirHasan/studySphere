import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider";
import { Link } from "react-router-dom";
import { apiEndpoint } from "../../../config/api";
import {
  showSuccess,
  showError,
  showInfo,
  showConfirm,
} from "../../../utils/toast";
import LoadingSpinner from "../../LoadingSpinner";
import ErrorDisplay from "../../ErrorDisplay";

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
    enabled: !!email,
    queryFn: () => {
      const normalizedEmail = email?.toLowerCase().trim();
      return fetch(
        apiEndpoint(`stored/email/${encodeURIComponent(normalizedEmail)}`),
        {
          credentials: "include",
        }
      ).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch notes: ${res.statusText}`);
        }
        return res.json();
      });
    },
  });

  useEffect(() => {
    if (data && !isPending && Array.isArray(data) && data.length === 0) {
      showInfo(
        "You don't have any notes yet. Create your first note to get started!",
        "No Notes Found"
      );
    }
  }, [data, isPending]);

  if (isPending) {
    return <LoadingSpinner message="Loading your notes..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  const handleDelete = async (_id) => {
    const result = await showConfirm(
      "This note will be permanently deleted. This action cannot be undone.",
      "Are you sure?"
    );

    if (result.isConfirmed) {
      try {
        const response = await fetch(apiEndpoint(`stored/${_id}`), {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to delete note: ${response.statusText}`);
        }

        await response.json();
        showSuccess(
          "Your note has been deleted successfully.",
          "Note Deleted! ✅"
        );
        refetch();
      } catch (error) {
        console.error("Error deleting note:", error);
        showError(
          "Failed to delete the note. Please try again.",
          "Delete Failed"
        );
      }
    }
  };

  const notes = Array.isArray(data) ? data : [];

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-12 p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg max-w-md mx-auto">
        <div className="bg-purple-200 rounded-full p-6 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-purple-400"
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
        <h3 className="text-2xl text-purple-700 font-bold mb-2">
          No Notes Yet
        </h3>
        <p className="text-gray-600 text-center mb-4">
          You haven't created any notes yet.
          <br />
          <span className="text-sm text-gray-500">
            Create your first note to get started!
          </span>
        </p>
        <Link
          to="/dashboard/createNote"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
        >
          Create Your First Note
        </Link>
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
        {notes.map((note) => (
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
