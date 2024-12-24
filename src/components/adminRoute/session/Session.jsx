import { useQuery } from "@tanstack/react-query";
import AdminSession from "./adminSession/AdminSession";

const Session = () => {
  const { isPending, error, data,refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:4000/session").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="bg-blue-950 text-white py-2 text-center">
        All study session created by tutor
      </h2>
      <div className="grid lg:grid-cols-2 gap-4 py-4">
        {data.map((session) => (
          <AdminSession key={session._id} session={session} refetch={refetch}></AdminSession>
        ))}
       
      </div>
      
    </div>
     
  );
 
};

export default Session;
