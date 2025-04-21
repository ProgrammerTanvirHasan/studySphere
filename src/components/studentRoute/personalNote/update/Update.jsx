import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const Update = () => {
  const { _id } = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["stored", _id],
    queryFn: () =>
      fetch(`https://stydy-sphere-server-vrnk.vercel.app/stored/${_id}`).then(
        (res) => res.json()
      ),
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: {error.message}</p>;

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const note = form.note.value;
    const notes = { title, note };

    fetch(`https://stydy-sphere-server-vrnk.vercel.app/stored/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(notes),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Done!",
          text: "Blog updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      });
    form.reset();
    refetch();
  };

  return (
    <div>
      <div className="bg-emerald-900 opacity-90 px-2 min-h-screen ">
        <h2 className="bg-orange-400 py-2 text-white text-center text-xl">
          Update Your Personal Note
        </h2>
        <form onSubmit={handleUpdate}>
          <div className="mt-4">
            <label className="input input-bordered flex items-center gap-2 lg:w-3/5 mx-auto mb-4">
              Title
              <input
                defaultValue={data.title}
                type="text"
                name="title"
                className="grow"
              />
            </label>

            <div className="lg:w-3/5 mx-auto">
              <textarea
                placeholder="Note"
                name="note"
                defaultValue={data.note}
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>

            <div className="text-center">
              <button className="btn bg-black text-white mt-4 w-full lg:w-3/5 text-lg">
                U p d a t e
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
