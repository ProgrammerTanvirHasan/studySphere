import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import UpdateMaterials from "./UpdateMaterials";

const ViewMaterials = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["material", email],
    queryFn: () =>
      fetch(`http://localhost:4000/material/${email}`).then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h2 className="text-center p-2 bg-cyan-950 text-white mb-4 text-xl">
        All materials here and you can update or delete
      </h2>
      <div className="grid lg:grid-cols-2 lg:ml-10 gap-4">
        {data.map((materials) => (
          <UpdateMaterials
            key={materials._id}
            materials={materials}
            refetch={refetch}
          ></UpdateMaterials>
        ))}
      </div>
    </div>
  );
};

export default ViewMaterials;
