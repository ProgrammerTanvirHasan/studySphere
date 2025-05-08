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
      fetch(`http://localhost:27017/register/${email}`).then((res) =>
        res.json()
      ),
  });

  if (isPending)
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium animate-pulse">Please wait...</p>
      </div>
    );
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

    fetch("http://localhost:27017/session", {
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
    <div className="px-4">
      <h2 className="text-cyan-700 py-4 text-center text-3xl">
        Create your session here
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Fill in the details below to create a new session for your students.
        Make sure to provide all necessary information, including start and end
        dates, fees, and session description.
      </p>
      <form onSubmit={handleSubmit} className="pb-6">
        {[
          { label: "Session Title", name: "title", type: "text" },
          {
            label: "Registration Start Date",
            name: "registrationStart",
            type: "date",
          },
          {
            label: "Registration End Date",
            name: "registrationEnd",
            type: "date",
          },
          { label: "Class Start Date", name: "classStart", type: "date" },
          { label: "Class End Date", name: "classEnd", type: "date" },
          {
            label: "Status",
            name: "status",
            type: "text",
            defaultValue: "Pending",
          },
          {
            label: "Registration Fee",
            name: "amount",
            type: "text",
            defaultValue: 0,
          },
          { label: "Class Duration", name: "duration", type: "number", min: 0 },
        ].map(({ label, ...props }) => (
          <div className="my-4 w-full" key={props.name}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">{label}</span>
              </div>
              <input
                {...props}
                className="w-full p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
              />
            </label>
          </div>
        ))}

        <div className="my-4 w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Session Description</span>
            </div>
            <textarea
              name="textarea"
              placeholder="About"
              className="w-full p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
            ></textarea>
          </label>
        </div>

        <div className="text-center mt-6">
          {data.role === "tutor" ? (
            <button className="btn w-full sm:w-60 bg-green-500 text-black text-xl">
              Submit
            </button>
          ) : (
            <button
              disabled
              className="btn w-full sm:w-60 bg-green-500 text-black text-xl"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateSession;
