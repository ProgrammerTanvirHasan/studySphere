import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../footer/Footer";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import Swal from "sweetalert2";

const SessionDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { _id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["sessionData", _id],
    queryFn: () =>
      fetch(`http://localhost:4000/session/${_id}`).then((res) => res.json()),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const isRegistrationClosed = moment().isAfter(moment(data.registrationEnd));
  const isPaidSession = data.amount > 0;
  const handleBook = () => {
    if (!isPaidSession) {
      const bookingData = {
        
        studentEmail: user.email,
        studySessionID: data._id,
        tutorEmail: data.email,
      };

      fetch("http://localhost:4000/bookedSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.json())
        .then((data) => {
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
          sessionID: data._id,
          amount: parseInt(data.amount),
          tutorEmail: data.email,
          studentEmail: user.email,
        },
      });
    }
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="flex justify-center text-center item-center py-2 ">
        <div className="bg-green-900 opacity-80  text-white lg:p-8 rounded-xl">
          <h2 className="text-xl"> The selected session</h2>
          <div className="pt-12">
            <p className="text-end text-orange-400">Reviews:</p>
            <div className="flex justify-between py-2">
              <h2 className="card card-title">{data.title}</h2>
              <p> Session duration: {data.duration} Minutes</p>
            </div>
            <div className="flex justify-between">
              <p>Registration Start From: {data.registrationStart}</p>
              <p>Registration Close: {data.registrationEnd}</p>
            </div>
            <div className="flex justify-between">
              <p>Class start from: {data.classStart}</p>
              <p>Class end: {data.classEnd}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="text-xl">Tutor: {data.name}</h2>
              <p>Registration fee: {data.amount} Taka</p>
            </div>

            <p className="pt-2 font-bold">{data.textarea}</p>
          </div>
          <div className="text-start mt-12">
            <h2> Reviews of the session</h2>
            <div className="grid grid-cols-3 gap-4">
              <p>Todo</p>
              <p>todo</p>
              <p>todo</p>
              <p>todo</p>
            </div>
          </div>
          {isRegistrationClosed ? (
            <>
              {" "}
              <button disabled className=" p-4 bg-red-800">
                {" "}
                Registration closed{" "}
              </button>{" "}
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
