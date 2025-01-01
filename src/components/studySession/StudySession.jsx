import { useQuery } from "@tanstack/react-query";
import SessionCard from "./sessionCard/SessionCard";
import { useState } from "react";

const StudySession = () => {
  const [showAll, setShowAll] = useState(false);
  const { isLoading, error, data } = useQuery({
    queryKey: ["sessionData"],
    queryFn: () =>
      fetch("http://localhost:4000/session/Approved").then((res) => res.json()),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div className="py-4">
      <h2 className="text-center text-xl bg-orange-400 opacity-80 text-white py-2">
        StudySession
      </h2>
      {showAll ? (
        <>
          <div className="grid lg:grid-cols-3 gap-4 py-4">
            {data.map((session) => (
              <SessionCard key={session._id} session={session}></SessionCard>
            ))}
          </div>
          <div className="text-end">
            <button
              onClick={handleShowLess}
              className="btn bg-orange-400 opacity-80 text-slate-950 font-bold"
            >
              See less
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-4 py-4">
            {data.slice(0, 6).map((session) => (
              <SessionCard key={session._id} session={session}></SessionCard>
            ))}
          </div>
          <div className="text-end">
            <button
              onClick={handleShowAll}
              className="btn bg-orange-400 opacity-80 text-slate-950 font-bold"
            >
              See all session
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudySession;
