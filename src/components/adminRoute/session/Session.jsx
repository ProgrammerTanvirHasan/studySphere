import { useQuery } from "@tanstack/react-query";
import AdminSession from "./adminSession/AdminSession";

const Session = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["PendingApproved"],
    queryFn: () =>
      fetch("http://localhost:4000/session/PendingApproved").then((res) =>
        res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="bg-blue-950 text-white py-2 text-center text-xl">
        All study session created by tutor
      </h2>
      <div className=" py-4 ">
        {data.map((session, index) => (
          <AdminSession
            key={session._id}
            session={session}
            refetch={refetch}
            index={index}
          ></AdminSession>
        ))}
      </div>
    </div>
  );
};

export default Session;
