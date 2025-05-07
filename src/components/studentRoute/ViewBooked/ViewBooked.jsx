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
      fetch(
        `https://stydy-sphere-server-vrnk.vercel.app/bookedSession/${email}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="py-4">
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        Your booked session
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
          <div className="grid lg:grid-cols-2 gap-2 p-2">
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
