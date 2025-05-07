import { useQuery } from "@tanstack/react-query";
import { Mail, User } from "lucide-react";

const NavTutor = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["register"],
    queryFn: () =>
      fetch("http://localhost:4000/register/register").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error fetching tutors</div>
    );

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-indigo-600 mb-3">
          🎓 Our Pride Tutors
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Meet our expert instructors dedicated to helping you succeed. Learn
          from professionals with real-world experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {data.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-gray-50 border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                <User size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">{tutor.name}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={16} />
              <span>{tutor.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavTutor;
