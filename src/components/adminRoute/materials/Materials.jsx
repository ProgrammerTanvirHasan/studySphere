import { useQuery } from "@tanstack/react-query";
import Material from "./Material";

const Materials = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["material"],
    queryFn: () =>
      fetch("https://stydy-sphere-server-vrnk.vercel.app/material", {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        All materials created by tutor
      </h2>
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
