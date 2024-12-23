import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import Swal from "sweetalert2";

const CreateNote = () => {
  const { user } = useContext(AuthContext);
  const handleNote = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const email = form.email.value;
    const note = form.note.value;
    const notes = { title, email, note };
    console.log(notes);

    fetch("http://localhost:4000/stored", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notes),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Added Your Note",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
    form.reset();
  };

  return (
    <div className="bg-green-300 px-2 lg:w-2/3 h-2/3">
      <h2 className="bg-orange-400 py-2 text-white text-center text-xl">
        Create Your Personal Note
      </h2>
      <form onSubmit={handleNote}>
        <div className="mt-4">
          <label className="input input-bordered flex items-center gap-2 lg:w-3/5 mx-auto">
            Title
            <input type="text" name="title" className="grow" />
          </label>

          <label className="input input-bordered flex items-center gap-2 lg:w-3/5 mx-auto my-2">
            Email
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              className="grow"
              required
            />
          </label>

          <div className="lg:w-3/5 mx-auto">
            <textarea
              placeholder="Note"
              name="note"
              className="textarea textarea-bordered textarea-lg w-full"
            ></textarea>
          </div>

          <div className="text-center">
            <button className="btn bg-black text-white mt-4 w-full lg:w-3/5 text-lg">
              Store
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
