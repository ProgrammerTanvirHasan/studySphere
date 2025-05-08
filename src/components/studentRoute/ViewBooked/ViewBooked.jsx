import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import BookedEmail from "./bookedEmail/BookedEmail";

const ViewBooked = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data } = useQuery({
    queryKey: ["sessionData", email],
    queryFn: () =>
      fetch(`https://stydy-sphere-server.vercel.app/bookedSession/${email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  if (isPending)
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium animate-pulse">
          Your booked session coming...
        </p>
      </div>
    );
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="py-4">
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        Your booked session
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Here you can see all the sessions you have successfully booked.
      </p>
      {data.length == 0 ? (
        <div className="flex flex-col items-center justify-center mt-12">
          <p className="text-gray-600 text-center">
            You do not have any booked session.
            <br />
            <span className="text-sm">(only booked session here)</span>
          </p>
        </div>
      ) : (
        <>
          <div className="conatiner mx-auto">
            <div className="grid lg:grid-cols-2 gap-2 p-2 container mx-auto">
              {data.map((booked) => (
                <BookedEmail key={booked._id} booked={booked}></BookedEmail>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBooked;
