import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider";
import { showSuccess, showError, showWarning } from "../../../utils/toast";
import { apiEndpoint } from "../../../config/api";

const CreateNote = () => {
  const { user } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);

  const handleNote = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const email = user?.email?.toLowerCase().trim();
    const note = form.note.value.trim();

    if (!title || !note) {
      showWarning(
        "Please fill in both title and note fields.",
        "Missing Information"
      );
      return;
    }

    if (!email) {
      showError(
        "You must be logged in to create notes.",
        "Authentication Required"
      );
      return;
    }

    setIsSaving(true);
    const notes = { title, email, note };

    try {
      const response = await fetch(apiEndpoint("stored"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to save note: ${response.statusText}`);
      }

      await response.json();
      showSuccess("Your note has been saved successfully!", "Note Saved! ✨");
      form.reset();
    } catch (error) {
      console.error("Error saving note:", error);
      showError("Failed to save your note. Please try again.", "Save Failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-cyan-700 text-center text-4xl font-semibold">
        Create Your Personal Note
      </h2>
      <p className="text-center text-gray-600">
        Keep track of your thoughts, reminders, or study highlights.
      </p>

      <form
        onSubmit={handleNote}
        className="bg-white rounded-xl shadow-md p-6 space-y-6"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Note Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a title for your note"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <div>
          <label
            htmlFor="note"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Your Note
          </label>
          <textarea
            name="note"
            id="note"
            placeholder="Write your note here..."
            className="w-full h-40 border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSaving}
            className={`bg-cyan-600 hover:bg-cyan-700 text-white text-lg px-6 py-2 rounded-md transition duration-300 w-full lg:w-1/2 ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                Saving...
              </span>
            ) : (
              "Store Note"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
