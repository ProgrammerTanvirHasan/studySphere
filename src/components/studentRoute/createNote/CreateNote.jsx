import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import Swal from "sweetalert2";

const CreateNote = () => {
  const { user } = useContext(AuthContext);

  const handleNote = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const email = user?.email;
    const note = form.note.value;
    const notes = { title, email, note };

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
    <div className="bg-green-900 px-2  h-3/4">
      <h2 className="bg-orange-400 py-2 text-white text-center text-xl mt-4">
        Create Your Personal Note
      </h2>
      <form onSubmit={handleNote}>
        <div className="mt-4">
          <label className="input input-bordered flex items-center gap-2 lg:w-3/5 mx-auto">
            Title
            <input type="text" name="title" className="grow" />
          </label>

          <div className="lg:w-3/5 mx-auto mt-4">
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
