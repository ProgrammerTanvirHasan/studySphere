import { useContext } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Announcement = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { isPending, error, data } = useQuery({
    queryKey: ["register",email],
    queryFn: () =>
      fetch(`http://localhost:4000/register/${email}`).then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleAnnouncement = (e) => {
    e.preventDefault();
    const form = e.target;
    const subject = form.title.value;
    const note = form.note.value;
    const publishDate = new Date().toISOString();
    const announcement = { subject, note, publishDate };

    fetch("http://localhost:4000/announcement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(announcement),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Done",
          text: "Published Your Announcement",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
    form.reset();
  };
  return (
    <div className="py-4">
      <div className="bg-green-300 px-2 ">
        <h2 className="bg-orange-400 py-2 text-white text-center text-xl">
          Make an announcement
        </h2>
        <form onSubmit={handleAnnouncement}>
          <div className="mt-4">
            <label className="input input-bordered flex items-center gap-2 lg:w-3/5 mx-auto">
              Subject
              <input type="text" name="title" className="grow" />
            </label>

            <div className="lg:w-3/5 mx-auto mt-4">
              <textarea
                placeholder="Notice"
                name="note"
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>

            <div className="text-center pb-4">
              {data.role === "admin" ? (
                <>
                  <button className="btn bg-black  hover:bg-green-900 text-white mt-4 w-full lg:w-3/5 text-lg ">
                    Publish
                  </button>
                </>
              ) : (
                <>
                  <button
                    disabled
                    className=" btn mt-4 w-full lg:w-3/5 text-lg "
                  >
                    Only admin !
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
        <div className="py-2">
          <Link to="/">
            <p className="text-center border  border-orange-900 ">
              Go back to home
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
