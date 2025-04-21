import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const CreateSession = () => {
  const { user } = useContext(AuthContext);

  const email = user?.email;

  const { isPending, error, data } = useQuery({
    queryKey: ["register", email],
    queryFn: () =>
      fetch(`http://localhost:4000/register/${email}`).then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const textarea = form.textarea.value;
    const status = form.status.value;
    const amount = parseInt(form.amount.value);
    const duration = parseInt(form.duration.value);
    const classStart = new Date(form.classStart.value);

    const classEnd = new Date(form.classEnd.value);
    const registrationEnd = new Date(form.registrationEnd.value);
    const registrationStart = new Date(form.registrationStart.value);

    const details = {
      title,
      textarea,
      status,
      amount,
      duration,
      classStart,
      registrationEnd,
      registrationStart,
      classEnd,
      email: user.email,
      name: user.displayName,
    };

    fetch("http://localhost:4000/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then(() => {
        Swal.fire({
          title: "Session Created Successfully",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => console.error("Error:", error));
    form.reset();
  };

  return (
    <div>
      <h2 className="text-center text-2xl bg-orange-400 text-white mt-4">
        Create your session here
      </h2>
      <form onSubmit={handleSubmit} className="bg-green-300 pb-4">
        <div className="mt-8 ">
          <div className="lg:flex lg:ml-24 gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text"> Session Title</span>
              </div>
              <input
                type="text"
                name="title"
                placeholder="title"
                className="input input-bordered full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text"> Registration start date</span>
              </div>
              <input
                type="date"
                name="registrationStart"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </div>

        <div className="lg:flex lg:ml-24 gap-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Session Description</span>
            </div>
            <textarea
              placeholder="About"
              name="textarea"
              className="textarea textarea-bordered textarea-md w-full max-w-xs "
            ></textarea>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text"> Registration end date</span>
            </div>
            <input
              type="date"
              name="registrationEnd"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div>
          <div className="lg:flex lg:ml-24 gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text"> Status</span>
              </div>
              <input
                type="text"
                name="status"
                defaultValue={"Pending"}
                className="input input-bordered full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Class start date</span>
              </div>
              <input
                type="date"
                name="classStart"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <div className="lg:flex lg:ml-24 gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text"> Registration fee</span>
              </div>

              <input
                type="text"
                name="amount"
                defaultValue={0}
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Class end date</span>
              </div>
              <input
                type="date"
                name="classEnd"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="lg:ml-24">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Class Duration</span>
              </div>
              <input
                type="number"
                min={0}
                name="duration"
                placeholder="duration"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </div>
        <div className="text-center mt-4">
          {data.role === "tutor" ? (
            <>
              <button className="btn w-60 bg-green-500 text-black text-xl">
                Submit
              </button>
            </>
          ) : (
            <>
              <button
                disabled
                className="btn w-60 bg-green-500 text-black text-xl"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateSession;
