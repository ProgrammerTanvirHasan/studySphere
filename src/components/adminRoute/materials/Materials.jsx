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
      <h2 className="py-2 text-center text-xl bg-neutral-800 text-white">
        All materials created by tutor
      </h2>
      {data.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-2 ml-8">
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
