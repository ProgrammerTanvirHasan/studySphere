import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import Materials from "./Materials";


const UploadMaterials = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data } = useQuery({
    queryKey: ["session", "Approved"],
    queryFn: () =>
      fetch(`http://localhost:4000/session/${email}`).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="text-center text-white text-xl bg-neutral-600 p-2">
        All Approved materials
      </h2>
      <div className="grid lg:grid-cols-2 gap-4">
        {data.map((material) => (
          <Materials key={material._id} material={material}></Materials>
        ))}
      </div>
    </div>
  );
};

export default UploadMaterials;
