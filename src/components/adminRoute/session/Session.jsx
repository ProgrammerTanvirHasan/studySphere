import { useQuery } from "@tanstack/react-query";
import AdminSession from "./adminSession/AdminSession";

const Session = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["PendingApproved"],
    queryFn: () =>
      fetch(
        "https://stydy-sphere-server-f46b.vercel.app/session/PendingApproved",
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2 className="bg-blue-950 text-white py-2 text-center text-xl">
        All study session created by tutor
      </h2>
      {data.length > 0 ? (
        <>
          {" "}
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

export default Session;
