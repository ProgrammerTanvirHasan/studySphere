import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../footer/Footer";
import { useParams } from "react-router";

const SessionDetails = () => {
  const { _id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["sessionData", _id],
    queryFn: () =>
      fetch(`http://localhost:4000/session/${_id}`).then((res) => res.json()),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const isRegistrationClosed = moment().isAfter(moment(data.registrationEnd));
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
              <button className="btn glass text-white px-12 text-lg">
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
