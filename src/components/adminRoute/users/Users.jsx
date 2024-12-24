import { useQuery } from "@tanstack/react-query";
import User from "./user/User";

const Users = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:4000/register").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="bg-orange-400 text-white text-center py-2">
        All users here
      </h2>
      <div className="grid lg:grid-cols-3 gap-4 mt-8">
        {data.map((users) => (
          <User key={users._id} users={users} refetch={refetch}></User>
        ))}
      </div>
    </div>
  );
};

export default Users;
