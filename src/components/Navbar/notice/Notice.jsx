import { useQuery } from "@tanstack/react-query";
import Notification from "./Notification/Notification";

const Notice = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["announcement"],
    queryFn: () =>
      fetch("https://stydy-sphere-server-vrnk.vercel.app/announcement", {
        credentials: "include",
      }).then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      {data.length > 0 ? (
        <>
          <h2 className="text-center bg-green-600 glass text-white text-xl py-2">
            All Announcement Here
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-center bg-green-600 glass text-red-600 text-xl py-2">
            No Announcement yet
          </h2>
        </>
      )}

      <div className="grid lg:grid-cols-3 lg:gap-4 px-2">
        {data.map((notice) => (
          <Notification key={notice._id} notice={notice}></Notification>
        ))}
      </div>
    </div>
  );
};

export default Notice;
