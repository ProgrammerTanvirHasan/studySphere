import { useQuery } from "@tanstack/react-query";
import Material from "./Material";

const Materials = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["material"],
    queryFn: () =>
      fetch("http://localhost:4000/material").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h2 className="py-2 text-center text-xl bg-neutral-800 text-white">
        All materials created by tutor
      </h2>
      <div className="grid lg:grid-cols-2 ml-8">
        {data.map((items) => (
          <Material key={items._id} items={items}></Material>
        ))}
      </div>
    </div>
  );
};

export default Materials;
