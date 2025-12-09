import { useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider";
import { useQuery } from "@tanstack/react-query";
import {
  showSuccessModal,
  showErrorModal,
  showWarning,
} from "../../../utils/toast";
import { apiEndpoint } from "../../../config/api";
import LoadingSpinner from "../../LoadingSpinner";
import ErrorDisplay from "../../ErrorDisplay";

const CreateSession = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { isPending, error, data } = useQuery({
    queryKey: ["register", email],
    enabled: !!email,
    queryFn: () => {
      const normalizedEmail = email?.toLowerCase().trim();
      return fetch(
        apiEndpoint(`register/${encodeURIComponent(normalizedEmail)}`),
        {
          credentials: "include",
        }
      ).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch user data: ${res.statusText}`);
        }
        return res.json();
      });
    },
  });

  useEffect(() => {
    if (data && !isPending) {
      const userData = Array.isArray(data)
        ? data.length > 0
          ? data[0]
          : null
        : data;
      if (userData && userData.role !== "tutor") {
        showWarning(
          "You need tutor access to create sessions. Please contact an administrator if you believe this is an error.",
          "Access Restricted"
        );
      }
    }
  }, [data, isPending]);

  if (isPending) {
    return <LoadingSpinner message="Loading your account information..." />;
  }

  if (error) {
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );
  }

  const userData = Array.isArray(data)
    ? data.length > 0
      ? data[0]
      : null
    : data;
  const isTutor = userData?.role === "tutor";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTutor) {
      showWarning(
        "Only tutors can create sessions. Please contact an administrator if you believe this is an error.",
        "Access Denied"
      );
      return;
    }

    const form = e.target;
    const title = form.title.value.trim();
    const textarea = form.textarea.value.trim();
    const status = form.status.value;
    const amount = parseInt(form.amount.value) || 0;
    const duration = parseInt(form.duration.value) || 0;
    const classStart = new Date(form.classStart.value);
    const classEnd = new Date(form.classEnd.value);
    const registrationEnd = new Date(form.registrationEnd.value);
    const registrationStart = new Date(form.registrationStart.value);

    // Validation
    if (!title || !textarea) {
      showErrorModal("Please fill in all required fields.", "Validation Error");
      return;
    }

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

    try {
      const response = await fetch(apiEndpoint("session"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.statusText}`);
      }

      await response.json();
      showSuccessModal(
        "Your session has been created successfully and is now pending approval.",
        "Session Created Successfully! 🎉"
      );
      form.reset();
    } catch (error) {
      console.error("Error creating session:", error);
      showErrorModal(
        error.message || "Failed to create session. Please try again.",
        "Failed to Create Session"
      );
    }
  };

  return (
    <div className="px-4">
      <h2 className="text-cyan-700 py-4 text-center text-3xl">
        Create your session here
      </h2>
      {!isTutor && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-lg shadow-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                Access Restricted
              </h3>
              <p className="text-sm text-yellow-700">
                You need tutor access to create sessions. Please contact an
                administrator if you believe this is an error.
              </p>
            </div>
          </div>
        </div>
      )}
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
          {isTutor ? (
            <button
              type="submit"
              className="btn w-full sm:w-60 bg-green-500 hover:bg-green-600 text-white text-xl font-semibold transition duration-300 shadow-lg hover:shadow-xl"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="btn w-full sm:w-60 bg-gray-400 text-gray-600 text-xl cursor-not-allowed opacity-60"
            >
              Submit (Tutor Access Required)
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateSession;
