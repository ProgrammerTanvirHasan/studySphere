import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import Swal from "sweetalert2";

const CreateNote = () => {
  const { user } = useContext(AuthContext);

  const handleNote = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const email = user?.email;
    const note = form.note.value.trim();

    if (!title || !note) {
      return Swal.fire({
        title: "Missing Info",
        text: "Please fill in both title and note fields.",
        icon: "warning",
      });
    }

    const notes = { title, email, note };

    fetch("https://stydy-sphere-server.vercel.app/stored", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(notes),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Your note has been saved successfully.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire({
          title: "Error!",
          text: "Failed to save your note.",
          icon: "error",
        });
      });

    form.reset();
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
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-lg px-6 py-2 rounded-md transition duration-300 w-full lg:w-1/2"
          >
            Store Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
