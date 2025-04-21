import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import BookedMaterials from "./BookedMaterials";
import Swal from "sweetalert2";

const AllStudyMaterials = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data } = useQuery({
    queryKey: ["bookedSession", email],
    queryFn: () =>
      fetch(
        `https://stydy-sphere-server-vrnk.vercel.app/bookedSession/${email}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="text-xl bg-neutral-700 py-2  text-white text-center">
        Your session
      </h2>
      {data.length === 0 ? (
        Swal.fire({
          title: "No data found",
          text: "Your booked session have no added any materials yet ",
          icon: "question",
          confirmButtonText: "Go to Home",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        })
      ) : (
        <>
          <div>
            {data.map((materials) => (
              <BookedMaterials
                key={materials._id}
                materials={materials}
              ></BookedMaterials>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllStudyMaterials;
