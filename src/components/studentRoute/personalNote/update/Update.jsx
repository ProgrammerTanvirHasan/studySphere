import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { apiEndpoint } from "../../../../config/api";
import { showSuccess, showError } from "../../../../utils/toast";
import LoadingSpinner from "../../../LoadingSpinner";
import ErrorDisplay from "../../../ErrorDisplay";

const Update = () => {
  const { _id } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["stored", _id],
    enabled: !!_id,
    queryFn: () =>
      fetch(apiEndpoint(`stored/${_id}`), {
        credentials: "include",
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch note: ${res.statusText}`);
        }
        return res.json();
      }),
  });

  if (isPending) {
    return <LoadingSpinner message="Loading note details..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const note = form.note.value.trim();

    if (!title || !note) {
      showError(
        "Please fill in both title and note fields.",
        "Missing Information"
      );
      return;
    }

    setIsUpdating(true);
    const updatedNote = { title, note };

    try {
      const response = await fetch(apiEndpoint(`stored/${_id}`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to update note: ${response.statusText}`);
      }

      await response.json();
      showSuccess(
        "Your note has been updated successfully!",
        "Note Updated! ✨"
      );
      refetch();
    } catch (error) {
      console.error("Error updating note:", error);
      showError("Failed to update note. Please try again.", "Update Failed");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl text-center text-cyan-700 font-bold mb-2">
          Update Your Note
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Make changes to your personal note and save it for later reference.
        </p>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block mb-1 font-medium text-gray-700"
            >
              Title
            </label>
            <input
              defaultValue={data.title}
              type="text"
              name="title"
              id="title"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label
              htmlFor="note"
              className="block mb-1 font-medium text-gray-700"
            >
              Note
            </label>
            <textarea
              defaultValue={data.note}
              name="note"
              id="note"
              required
              rows="6"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isUpdating}
              className={`bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-lg transition ${
                isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUpdating ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </span>
              ) : (
                "Update Note"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
