import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const Update = () => {
  const { _id } = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["stored", _id],
    queryFn: () =>
      fetch(`https://stydy-sphere-server.vercel.app/stored/${_id}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isLoading) return <p className="text-center py-8">Loading...</p>;

  if (error)
    return <p className="text-center text-red-600">Error: {error.message}</p>;

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const note = form.note.value;
    const updatedNote = { title, note };

    fetch(`https://stydy-sphere-server.vercel.app/stored/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Note updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        refetch();
      });
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
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
