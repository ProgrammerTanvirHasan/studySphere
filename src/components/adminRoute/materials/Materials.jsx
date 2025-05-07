import { useQuery } from "@tanstack/react-query";
import Material from "./Material";

const Materials = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["material"],
    queryFn: () =>
      fetch("http://localhost:4000/material", {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h2 className="text-cyan-700 py-2 text-center text-3xl">All materials</h2>
      <p className="text-center text-gray-600 mb-4">
        View and manage all the materials uploaded by tutors. Admins have access
        to approve and oversee these materials.
      </p>
      {data.length > 0 ? (
        <>
          <div className=" grid lg:grid-cols-2 gap-4 p-4">
            {data.map((items) => (
              <Material
                key={items._id}
                items={items}
                refetch={refetch}
              ></Material>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-2xl text-red-600 ! ">
            You have no access !{" "}
            <span className="text-sm ">( only admin )</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Materials;
