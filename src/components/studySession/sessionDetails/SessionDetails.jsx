import { useQueries } from "@tanstack/react-query";
import moment from "moment";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../footer/Footer";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import Swal from "sweetalert2";
import { Rating } from "@smastrom/react-rating";

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
          fetch(`http://localhost:4000/session/Approved/${_id}`).then((res) =>
            res.json()
          ),
      },
      {
        queryKey: ["reviewsData", _id],
        queryFn: () =>
          fetch(`http://localhost:4000/reviews/${_id}`).then((res) =>
            res.json()
          ),
      },
      {
        queryKey: ["registerData", email],
        queryFn: () =>
          fetch(`http://localhost:4000/register/${email}`).then((res) =>
            res.json()
          ),
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

  if (sessionLoading || reviewsLoading || registerLoading) return "Loading...";
  if (sessionError || reviewsError || registerError) {
    return `An error occurred: ${
      sessionError?.message || reviewsError?.message
    }`;
  }

  const isRegistrationClosed = moment().isAfter(
    moment(sessionData.registrationEnd)
  );
  const isPaidSession = sessionData.amount > 0;
  const handleBook = () => {
    if (!isPaidSession) {
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

      fetch("http://localhost:4000/bookedSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.json())
        .then(() => {
          Swal.fire({
            title: "Booking Successful!",
            text: "Your session has been booked successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => console.error(error));
      navigate("/");
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
    }
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="flex justify-center text-center item-center py-2 ">
        <div className="bg-green-900 opacity-80  text-white lg:p-8 rounded-xl ">
          <h2 className="text-xl"> The selected session</h2>
          <div className="pt-12">
            <div className="flex justify-between py-2">
              <h2 className="card card-title">{sessionData.title}</h2>
              <p> Session duration: {sessionData.duration} Minutes</p>
            </div>
            <div className="flex justify-between">
              <p>Registration Start From: {sessionData.registrationStart}</p>
              <p>Registration Close: {sessionData.registrationEnd}</p>
            </div>
            <div className="flex justify-between">
              <p>Class start from: {sessionData.classStart}</p>
              <p>Class end: {sessionData.classEnd}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-xl">Tutor: {sessionData.name}</h2>
              <p>Registration fee: {sessionData.amount} Taka</p>
            </div>

            <p className="pt-2  w-3/4">{sessionData.textarea}</p>
          </div>
          <div className="text-start  mt-12">
            <h2 className="card card-title border-b-2 w-96">
              Students Review of the session
            </h2>
            {reviews.length === 0 ? (
              <p className="text-red-300">No Review Here</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 my-2 px-2">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-black px-2">
                    <p className="text-center">
                      <Rating style={{ maxWidth: 180 }} value={review.rating} />
                    </p>
                    <p className="mb-2">{review.review}</p>
                    <p className="text-green-400">{review.student}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isRegistrationClosed ||
          register.role === "admin" ||
          register.role === "tutor" ? (
            <>
              <button disabled className="p-4 bg-red-800">
                {isRegistrationClosed
                  ? "Registration closed"
                  : "You can not book any item"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleBook}
                className="btn glass text-white px-12 text-lg"
              >
                Book Now
              </button>
            </>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SessionDetails;
