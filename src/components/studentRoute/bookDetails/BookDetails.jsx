import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider";

const BookDetails = () => {
  const { title } = useParams();
  const { user } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["bookedSession", title],
    queryFn: () =>
      fetch(`http://localhost:27017/bookedSession/title/${title}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-600">Error: {error.message}</p>;

  const { data: sessions, emails } = data || { data: [], emails: [] };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    const rating = parseInt(form.rating.value);
    const reviewID = sessions.studySessionID;
    const email = user?.email;
    const reviews = { review, rating, reviewID, email };

    fetch(`http://localhost:27017/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(reviews),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Done!",
          text: "Review submitted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      });

    form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-cyan-700 text-center text-4xl font-semibold">
        Session Details
      </h2>
      <p className="text-center text-gray-600">
        Below are the details of your booked session and a form to leave a
        review.
      </p>

      <div className="bg-white rounded-xl shadow-md p-6 border border-orange-300 space-y-3">
        <h3 className="text-2xl font-bold text-gray-800">{sessions.title}</h3>
        <p className="text-gray-600">
          Tutor: <span className="font-semibold">{sessions.Tutor}</span>
        </p>
        <p className="text-gray-600">Email: {sessions.tutorEmail}</p>
        <p className="text-gray-600">
          Fee: <span className="font-medium">{sessions.amount} Taka</span>
        </p>
        <p className="text-gray-600">Duration: {sessions.duration} min</p>
        <p className="text-green-700 font-semibold">{sessions.status}</p>
        <p className="text-gray-700">{sessions.textarea}</p>
        <p className="text-gray-600">
          Registration End: {sessions.registrationEnd}
        </p>
        <p className="text-gray-600">Class Starts: {sessions.classStart}</p>
        {sessions.transactionId ? (
          <p className="text-gray-600">
            Transaction ID: {sessions.transactionId}
          </p>
        ) : (
          <p className="text-gray-600">Registration: Free</p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 rounded-xl shadow-md p-6 space-y-6"
      >
        <h3 className="text-xl font-semibold text-gray-800">Leave a Review</h3>
        <div className="flex flex-col lg:flex-row gap-6">
          <textarea
            name="review"
            placeholder="Write your review..."
            className="textarea textarea-bordered w-full h-32 p-3 border border-gray-400 rounded-md resize-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="rating"
              className="text-lg font-medium text-gray-700"
            >
              Rating (1-5)
            </label>
            <input
              type="number"
              name="rating"
              id="rating"
              min="1"
              max="5"
              className="p-2 border border-gray-400 rounded-md w-20 text-center"
              required
            />
          </div>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-300"
          >
            Submit Review
          </button>
        </div>
      </form>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
          Students Who Booked This Session
        </h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          {emails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetails;
