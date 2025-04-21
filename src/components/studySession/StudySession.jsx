import { useQuery } from "@tanstack/react-query";
import SessionCard from "./sessionCard/SessionCard";
import { useState } from "react";

const StudySession = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 3;
  const { isLoading, error, data } = useQuery({
    queryKey: ["sessionData", currentPage, itemPerPage],
    queryFn: () =>
      fetch(
        `https://stydy-sphere-server-f46b.vercel.app/session/Approved?page=${currentPage}&limit=${itemPerPage}`
      ).then((res) => res.json()),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const { totalCount, sessions } = data;
  const numberOfPage = Math.ceil(totalCount / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  return (
    <div className="py-4">
      <h2 className="text-center text-xl bg-orange-400 opacity-80 text-white py-2">
        StudySession
      </h2>
      <div className="grid lg:grid-cols-3 gap-4 py-4">
        {sessions.map((session) => (
          <SessionCard key={session._id} session={session}></SessionCard>
        ))}
      </div>
      <div className="text-center">
        <div>
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={`btn ${
                page === currentPage ? "bg-orange-900" : "bg-orange-400"
              } text-white`}
              key={page}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudySession;
