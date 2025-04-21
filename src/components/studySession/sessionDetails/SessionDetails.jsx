import { useQueries } from "@tanstack/react-query";
import moment from "moment";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../footer/Footer";
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
            `https://stydy-sphere-server-vrnk.vercel.app/session/Approved/${_id}`
          ).then((res) => res.json()),
      },
      {
        queryKey: ["reviewsData", _id],
        queryFn: () =>
          fetch(
            `https://stydy-sphere-server-vrnk.vercel.app/reviews/${_id}`
          ).then((res) => res.json()),
      },
      {
        queryKey: ["registerData", email],
        queryFn: () =>
          fetch(
            `https://stydy-sphere-server-vrnk.vercel.app/register/${email}`
          ).then((res) => res.json()),
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

      fetch(`https://stydy-sphere-server-vrnk.vercel.app/bookedSession`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
            return response.json();
          }
        })
        .then(() => {
          Swal.fire({
            title: "Booking Successful!",
            text: "Your session has been booked successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => console.log(error.message));

      navigate("/");
    }
    if (isPaidSession) {
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
      fetch(`https://stydy-sphere-server-vrnk.vercel.app/bookedSession`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      }).then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          Swal.fire({
            title: "Error!",
            text: error.message || "Something went wrong.",
            icon: "error",
            confirmButtonText: "OK",
          });
          return response.json();
        }
      });

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
    <div className="bg-[#998282]">
      <Navbar></Navbar>

      <div>
        <img
          className="min-w-full h-[400px] lg:h-[560px] pt-6"
          src="https://i.ibb.co.com/frqDgdy/high-angle-academic-cap-glasses-with-globe-23-2148756568.jpg"
          alt=""
        />
        <h2 className="text-2xl border-b-4 border-green-700 font-bold absolute -mt-16 ml-[5%]">
          The selected session
        </h2>
      </div>

      <div>
        <div className="p-4 text-white">
          <div>
            <div className="text-orange-200 shadow-xl ">
              <h2 className="text-2xl ">{sessionData.title}</h2>
              <h2 className="text-xl">Tutor : {sessionData.name}</h2>
              <p className="font-semibold pb-8">{sessionData.textarea}</p>
            </div>

            <div>
              <p className="flex gap-2">
                Session_duration : {sessionData.duration} Minutes{" "}
                <MdAccessTime className="text-lg mt-1"></MdAccessTime>{" "}
              </p>
              <p>Registration_Start_From : {sessionData.registrationStart}</p>
              <p>Registration_Close : {sessionData.registrationEnd}</p>
              <p>Class_start_from : {sessionData.classStart}</p>
              <p>Class_end : {sessionData.classEnd}</p>
              <p>Registration_fee : {sessionData.amount} Taka</p>
            </div>
          </div>
        </div>

        <div className="text-start mt-12 bg-[#854748] rounded-md">
          <h2 className="card card-title border-b-2 P-4 min-w-ful text-white">
            Students Review of the session
          </h2>
          {reviews.length === 0 ? (
            <p className="text-red-300 p-8 text-xl">No Review Here!</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 my-2 px-2 text-white pb-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-slate-950 p-4">
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
          <button
            disabled
            className="p-4 bg-red-950 glass text-white mt-4 min-w-full"
          >
            {isRegistrationClosed
              ? "Registration closed!"
              : "You cannot book any item!"}
          </button>
        ) : (
          <button
            onClick={handleBook}
            className="hover:bg-green-900 text-lg bg-slate-950 w-full py-2 text-white glass btn hover:text-black"
          >
            Book Now
          </button>
        )}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default SessionDetails;
