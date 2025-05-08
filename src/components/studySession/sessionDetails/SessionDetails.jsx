import { useQueries } from "@tanstack/react-query";
import moment from "moment";

import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import Swal from "sweetalert2";
import { Rating } from "@smastrom/react-rating";
import { MdAccessTime } from "react-icons/md";
import "@smastrom/react-rating/style.css";

const SessionDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { _id } = useParams();
  const email = user?.email;

  const [sessionQuery, reviewsQuery, registerQuery] = useQueries({
    queries: [
      {
        queryKey: ["sessionData", _id],
        queryFn: () =>
          fetch(
            `https://stydy-sphere-server.vercel.app/session/Approved/${_id}`,
            {
              credentials: "include",
            }
          ).then((res) => res.json()),
      },
      {
        queryKey: ["reviewsData", _id],
        queryFn: () =>
          fetch(`https://stydy-sphere-server.vercel.app/reviews/${_id}`, {
            credentials: "include",
          }).then((res) => res.json()),
      },
      {
        queryKey: ["registerData", email],
        queryFn: () =>
          fetch(`https://stydy-sphere-server.vercel.app/register/${email}`, {
            credentials: "include",
          }).then((res) => res.json()),
      },
    ],
  });

  const {
    data: sessionData,
    isLoading: sessionLoading,
    error: sessionError,
  } = sessionQuery;

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = reviewsQuery;

  const {
    data: register,
    isLoading: registerLoading,
    error: registerError,
  } = registerQuery;

  if (sessionLoading || reviewsLoading || registerLoading)
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium animate-pulse">
          Loading Study Sessions...
        </p>
      </div>
    );

  if (sessionError || reviewsError || registerError) {
    return (
      <div className="text-red-600 text-center py-20">
        An error occurred:{" "}
        {sessionError?.message ||
          reviewsError?.message ||
          registerError?.message}
      </div>
    );
  }

  const isRegistrationClosed = moment().isAfter(
    moment(sessionData.registrationEnd)
  );
  const isPaidSession = sessionData.amount > 0;

  const handleBook = () => {
    const bookingData = {
      studentEmail: user.email,
      studySessionID: sessionData._id,
      tutorEmail: sessionData.email,
      title: sessionData.title,
      textarea: sessionData.textarea,
      status: sessionData.status,
      amount: sessionData.amount,
      duration: sessionData.duration,
      classStart: sessionData.classStart,
      classEnd: sessionData.classEnd,
      registrationStart: sessionData.registrationStart,
      registrationEnd: sessionData.registrationEnd,
      Tutor: sessionData.name,
    };

    fetch(`https://stydy-sphere-server.vercel.app/bookedSession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bookingData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          Swal.fire({
            title: "Error!",
            text: error.message || "Something went wrong.",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }

        if (isPaidSession) {
          navigate("/payment", {
            state: {
              amount: parseInt(sessionData.amount),
              tutorEmail: sessionData.email,
              studentEmail: user.email,
              studySessionID: sessionData._id,
              registrationEnd: sessionData.registrationEnd,
              Tutor: sessionData.name,
              registrationStart: sessionData.registrationStart,
              classStart: sessionData.classStart,
              duration: sessionData.duration,
              title: sessionData.title,
              textarea: sessionData.textarea,
              status: sessionData.status,
            },
          });
        } else {
          Swal.fire({
            title: "Booking Successful!",
            text: "Your session has been booked successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/");
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className="bg-[#f3f4f6] min-h-screen">
        <div className="relative   overflow-hidden">
          <div className="  lg:flex">
            <img
              src="https://i.ibb.co.com/vvhjc3Ms/image.png"
              alt="Session Banner"
              className="w-22 h-22 object-cover lg:rotate-45"
            />
            <div className=" flex justify-center items-center relative">
              <img
                src="https://i.ibb.co.com/fd2YhHV9/image-removebg-preview-1.png"
                alt="Session Banner"
                className="w-22 h-22 object-cover "
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
            <h2 className="text-3xl font-bold text-white px-6 py-4 ">
              {sessionData.title}
            </h2>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 lg:px-0 py-10">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">
              Tutor: {sessionData.name}
            </h2>
            <p className="text-gray-700 mb-6">{sessionData.textarea}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p className="flex items-center gap-2">
                <MdAccessTime className="text-xl" /> Duration:{" "}
                {sessionData.duration} Minutes
              </p>
              <p>📅 Registration Start: {sessionData.registrationStart}</p>
              <p>🚫 Registration Ends: {sessionData.registrationEnd}</p>
              <p>📚 Class Starts: {sessionData.classStart}</p>
              <p>🏁 Class Ends: {sessionData.classEnd}</p>
              <p>💰 Fee: {sessionData.amount} Taka</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 mb-10">
            <h3 className="text-xl font-semibold mb-4">💬 Student Reviews</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-white p-4 rounded shadow">
                    <Rating
                      style={{ maxWidth: 160 }}
                      value={review.rating}
                      readOnly
                    />
                    <p className="text-gray-700 my-2">{review.review}</p>
                    <p className="text-sm text-green-600 font-semibold">
                      - {review.student}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {isRegistrationClosed ||
            register.role === "admin" ||
            register.role === "tutor" ? (
              <button
                disabled
                className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
              >
                {isRegistrationClosed
                  ? "Registration closed!"
                  : "You are not allowed to book this session."}
              </button>
            ) : (
              <button
                onClick={handleBook}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold transition"
              >
                Book This Session
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionDetails;
