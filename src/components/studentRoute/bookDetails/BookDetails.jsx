import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

const BookDetails = () => {
  const { title } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["bookedSession", title],
    queryFn: () =>
      fetch(`http://localhost:4000/bookedSession/title/${title}`).then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <h2 className="text-center text-xl bg-orange-400 text-white  ">
        Booked Details
      </h2>
      <div className="card bg-base-800  shadow-2xl border border-orange-400 w-2/3 mx-auto mt-4 p-4 ">
        <h2 className="text-xl py-2">{data.title}</h2>
        <p className="font-semibold">Tutor :{data.Tutor}</p>
        <p>{data.tutorEmail}</p>
        <div className="py-2">
          <p>Fee :{data.amount} taka</p>
          <p>
            {data.duration} <span className="text-lg">min</span>{" "}
          </p>
        </div>
        <p className="font-bold text-green-700 mb-2">{data.status}</p>
        <p className="mb-2">{data.textarea}</p>
        <p>RegEndDate :{data.registrationEnd}</p>
        <p>ClassStartDate :{data.classStart}</p>
        {data.transactionId ? (
          <>
            {" "}
            <p>TransitionID : {data.transactionId}</p>{" "}
          </>
        ) : (
          <>
            {" "}
            <p>Registration : Free</p>{" "}
          </>
        )}
      </div>
      <Link to={"/"}>
        <div className=" mt-8 text-center">
          <button className="bg-green-700 px-8 py-2 glass text-white">
            Back to home
          </button>
        </div>
      </Link>
    </>
  );
};

export default BookDetails;
