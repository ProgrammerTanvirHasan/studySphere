import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import UpdateMaterials from "./UpdateMaterials";
import Swal from "sweetalert2";

const ViewMaterials = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["material", email],
    queryFn: () =>
      fetch(`https://stydy-sphere-server-vrnk.vercel.app/material/${email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        You can update or delete this materials
      </h2>
      {data.length === 0 ? (
        Swal.fire({
          title: "No data found",
          text: "You have no added materials.",
          icon: "question",
          confirmButtonText: "Go to Home",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        })
      ) : (
        <>
          <div className="grid lg:grid-cols-2 lg:ml-10 gap-4">
            {data.map((materials) => (
              <UpdateMaterials
                key={materials._id}
                materials={materials}
                refetch={refetch}
              ></UpdateMaterials>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewMaterials;
