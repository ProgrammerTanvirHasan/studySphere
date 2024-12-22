import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    const rating = parseInt(form.rating.value);
    const reviewID = data.studySessionID;
    const reviews = { review, rating, reviewID };

    fetch(`http://localhost:4000/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviews),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Done!",
          text: "send reviews successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      });

    form.reset();
  };

  return (
    <>
      <h2 className="text-center text-xl bg-orange-400 text-white py-2 ">
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

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-100 rounded-lg shadow-2xl"
      >
        <div className="flex justify-end mt-8 gap-8">
          <textarea
            placeholder="Review"
            name="review"
            className="textarea textarea-bordered border-slate-950 textarea-lg w-full max-w-xs"
          ></textarea>

          <div className="flex flex-col items-center space-y-4">
            <label htmlFor="rating" className="text-lg font-medium">
              Enter your rating:
            </label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              name="rating"
              className="w-20 p-2 border border-slate-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 mr-8">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-green-600 active:scale-95 focus:ring-2 focus:ring-green-300 transition duration-300"
          >
            Submit Review
          </button>
        </div>
      </form>

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
