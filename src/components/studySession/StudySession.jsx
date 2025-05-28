import { useQuery } from "@tanstack/react-query";
import SessionCard from "./sessionCard/SessionCard";
import { useState } from "react";

const StudySession = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 3;

  const { isPending, error, data } = useQuery({
    queryKey: ["sessionData", currentPage, itemPerPage],
    queryFn: () =>
      fetch(
        `https://stydysphereserver.onrender.com/session/Approved?page=${currentPage}&limit=${itemPerPage}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });

  const totalCount = data?.totalCount || 0;
  const sessions = data?.sessions || [];

  const numberOfPage = Math.ceil(totalCount / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">
          📚 Study Sessions
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
          Explore upcoming study sessions led by top mentors and fellow
          learners. Stay consistent, stay motivated, and never study alone
          again.
        </p>
      </div>

      {isPending ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
          <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
          <p className="text-lg font-medium animate-pulse">
            Loading Study Sessions...
          </p>
        </div>
      ) : (
        <>
          {sessions.length > 0 ? (
            <>
              <div className="container mx-auto ">
                <div className=" grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-3 gap-4">
                  {sessions.map((session) => (
                    <SessionCard key={session._id} session={session} />
                  ))}
                </div>
              </div>

              <div className="text-center mt-8 flex flex-wrap justify-center gap-2">
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-md text-white   font-semibold transition-all duration-300 ${
                      page === currentPage
                        ? "bg-orange-800 scale-105"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No sessions found.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default StudySession;
