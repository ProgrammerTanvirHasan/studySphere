import { useQuery } from "@tanstack/react-query";
import { FaGoogleDrive } from "react-icons/fa";
import { Link, useParams } from "react-router";

const ShowMaterials = () => {
  const { studySessionID } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["material", studySessionID],
    queryFn: () =>
      fetch(
        `https://stydysphereserver.onrender.com/material/material/${studySessionID}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });

  if (isPending)
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-orange-500 space-y-4">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-lg font-medium animate-pulse">Please wait...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[30vh] flex flex-col justify-center items-center text-red-600 text-lg font-semibold">
        An error has occurred: {error.message}
      </div>
    );

  if (!data || data.error)
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="No Material"
          className="w-32 h-32 mb-4 opacity-70"
        />
        <h2 className="text-2xl text-gray-700 font-semibold mb-2">
          No Material Found
        </h2>
        <p className="text-gray-500 max-w-md">
          It looks like no study materials have been uploaded for this session
          yet. Please check back later or contact the tutor.
        </p>
      </div>
    );

  return (
    <div>
      <h2 className="text-cyan-700 py-2 text-center text-3xl">
        Show Materials
      </h2>
      <div className="flex justify-center">
        <div className="lg:pt-8 w-full lg:w-1/2 p-2 shadow-2xl rounded-md">
          <img
            className="min-w-full h-64 object-cover rounded-md"
            src={data.imageUrl}
            alt={data.title}
          />
          <div className="flex flex-row-reverse justify-between mt-2">
            <a href={data.imageUrl} download={data.title}>
              <button className="font-bold text-green-700 hover:underline">
                Download
              </button>
            </a>
            <div className="flex items-center space-x-2">
              <FaGoogleDrive className="text-2xl text-blue-600" />
              <Link to={data.driveLink}>
                <button className="text-sm text-blue-800 font-medium border-b-2 border-blue-800 hover:text-blue-900">
                  Google Drive
                </button>
              </Link>
            </div>
          </div>
          <h2 className="card-title mt-4">{data.title}</h2>
          <p className="text-sm text-gray-600">{data.tutorEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowMaterials;
