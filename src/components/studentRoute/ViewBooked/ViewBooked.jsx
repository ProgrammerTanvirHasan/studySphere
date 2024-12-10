import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import BookedEmail from "./bookedEmail/BookedEmail";

const ViewBooked = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isLoading, error, data } = useQuery({
    queryKey: ["sessionData", email],
    queryFn: () =>
      fetch(`http://localhost:4000/bookedSession/${email}`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="py-4">
      <h2 className="text-center text-xl bg-orange-400 text-white ">
        All session that you are booked
      </h2>
      <div className="grid lg:grid-cols-2 gap-4 py-4">
        {data.map((booked) => (
          <BookedEmail key={booked._id} booked={booked}></BookedEmail>
        ))}
      </div>
    </div>
  );
};

export default ViewBooked;
