import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import Marquee from "react-fast-marquee";
const PersonalNote = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data } = useQuery({
    queryKey: ["storeData", email],
    queryFn: () =>
      fetch(`http://localhost:4000/stored/${email}`).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="bg-indigo-950 max-w-full min-h-screen">
      <h2 className="bg-orange-400 py-2 text-center text-white text-xl">
        Personal Note That You Stored
      </h2>
      {data.length === 0 ? (
        <>
          <div className="w-[780px] h-[780px]  mt-4 overflow-hidden flex items-center justify-center">
            <Marquee
              direction="down"
              speed={100}
              gradient={false}
              className="w-full h-full"
              pauseOnHover
            >
              <Marquee
                direction="alternate"
                speed={50}
                gradient={false}
                pauseOnHover
              >
                <p className="text-center  font-bold text-6xl text-red-600">
                  No Note Yet
                </p>
              </Marquee>
            </Marquee>
          </div>
        </>
      ) : (
        <div className="px-4 ">
          {data.map((note) => (
            <div key={note._id}>
              <h2 className="text-2xl text-white">Title :{note.title}</h2>{" "}
              <p className="text-white text-sm mb-8">{note.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalNote;
