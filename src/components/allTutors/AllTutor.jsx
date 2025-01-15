import { useQuery } from "@tanstack/react-query";
import TutorName from "./tutorName/TutorName";

const AllTutor = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["sessionData"],
    queryFn: () =>
      fetch(`http://localhost:4000/register/register`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  console.log(data, "data");
  return (
    <div className="py-4">
      <h2 className="text-center text-xl bg-orange-400 opacity-80 text-white py-2">
        All Tutor Here
      </h2>
      <div className="grid lg:grid-cols-3 gap-4 pt-8">
        {data.map((tutor) => (
          <TutorName key={tutor._id} tutor={tutor}></TutorName>
        ))}
      </div>
    </div>
  );
};

export default AllTutor;
