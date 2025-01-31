import { useQuery } from "@tanstack/react-query";
import Sessions from "./sessions/Sessions";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";

const AllSession = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["session", email],
    queryFn: () =>
      fetch(`http://localhost:4000/session/email/${email}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h2 className="text-center bg-blue-950 text-white py-2 mb-8">
        All session that you created
      </h2>
      {data.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-2 gap-4 ">
            {data.map((session) => (
              <Sessions
                key={session._id}
                session={session}
                refetch={refetch}
              ></Sessions>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>No data found !</p>
        </>
      )}
    </div>
  );
};

export default AllSession;
