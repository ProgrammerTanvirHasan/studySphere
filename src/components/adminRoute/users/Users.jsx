import { useQuery } from "@tanstack/react-query";
import User from "./user/User";

const Users = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["register"],
    queryFn: () =>
      fetch(`http://localhost:4000/register`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error("Error fetching data:", err);
          return [];
        }),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="text-3xl text-cyan-700 text-center py-2">
        All users here
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Below is a list of all registered users in the system. Only admins have
        permission to view and manage this data.
      </p>

      {data.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-3 gap-4 mt-8">
            {data?.map((users) => (
              <User key={users._id} users={users} refetch={refetch}></User>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-2xl text-red-600 ! ">
            You have no access !<span className="text-sm ">( only admin )</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Users;
