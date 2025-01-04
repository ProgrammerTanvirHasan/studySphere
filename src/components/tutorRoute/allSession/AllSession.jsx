import { useQuery } from "@tanstack/react-query";
import Sessions from "./sessions/Sessions";

const AllSession = () => {
  const { isPending, error, data ,refetch} = useQuery({
    queryKey: ["session"],
    queryFn: () =>
      fetch("http://localhost:4000/session").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h2 className="text-center bg-blue-950 text-white py-2 mb-8">
        All session that you created
      </h2>
      <div className="grid lg:grid-cols-2 gap-4 ">
        {data.map((session) => (
          <Sessions key={session._id} session={session} refetch={refetch}></Sessions>
        ))}
      </div>
    </div>
  );
};

export default AllSession;
