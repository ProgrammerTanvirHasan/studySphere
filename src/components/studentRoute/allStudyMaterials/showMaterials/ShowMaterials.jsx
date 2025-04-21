import { useQuery } from "@tanstack/react-query";
import { FaGoogleDrive } from "react-icons/fa";
import { Link, useParams } from "react-router";

const ShowMaterials = () => {
  const { studySessionID } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["material", studySessionID],
    queryFn: () =>
      fetch(
        `https://stydy-sphere-server-f46b.vercel.app/material/material/${studySessionID}`
      ).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  if (!data || data.error) return "Material not found !";

  return (
    <div>
      <h2 className="text-center py-2 text-white bg-cyan-900 text-xl">
        Show Materials
      </h2>
      <div className="flex justify-center">
        <div className="lg:pt-8 w-full lg:w-1/2  shadow-2xl rounded-md">
          <img
            className="min-w-full h-64"
            src={data.imageUrl}
            alt={data.title}
          />
          <div className="flex flex-row-reverse justify-between">
            <a href={data.imageUrl} download={data.title}>
              <button className="font-bold text-green-950">Download</button>
            </a>

            <div className="flex ">
              <p className="text-2xl">
                <FaGoogleDrive></FaGoogleDrive>
              </p>
              <Link to={data.driveLink}>
                <button className="text-sm  border-b-4 border-black">
                  Google Drive
                </button>
              </Link>
            </div>
          </div>
          <h2 className="card-title ">{data.title}</h2>
          <p>{data.tutorEmail}</p>
          <div className="py-2">
            <Link to={"/"}>
              <button className="border-b-2 border-red-600 font-bold text-red-600">
                Go back to home !
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMaterials;
