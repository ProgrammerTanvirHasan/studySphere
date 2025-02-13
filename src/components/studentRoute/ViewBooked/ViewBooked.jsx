import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import BookedEmail from "./bookedEmail/BookedEmail";
import Swal from "sweetalert2";

const ViewBooked = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isLoading, error, data } = useQuery({
    queryKey: ["sessionData", email],
    queryFn: () =>
      fetch(`http://localhost:4000/bookedSession/${email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="py-4">
      <h2 className="text-center text-xl bg-orange-400 text-white py-2 ">
        All session that you are booked
      </h2>
      {data.length == 0 ? (
        Swal.fire({
          title: "No data found",
          text: "You have ho any booked session ! ",
          icon: "question",
          confirmButtonText: "Go to Home",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        })
      ) : (
        <>
          <div className="grid lg:grid-cols-2 gap-4 py-4">
            {data.map((booked) => (
              <BookedEmail key={booked._id} booked={booked}></BookedEmail>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBooked;
