
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const tutors = [
  {
    id: "1",
    name: "Rafiq Ahmed",
    subject: "Cloud Computing",
    experience: "5 years",
    rating: 4.8,
    image: "https://i.ibb.co.com/NdKf71zP/image.png",
    bio: "Expert in high school math and algebra.",
  },
  {
    id: "2",
    name: "Sabina Yasmin",
    subject: "Front-End Development",
    experience: "3 years",
    rating: 4.6,
    image: "https://i.ibb.co.com/V0Xp09WS/image.png",
    bio: "Passionate physics tutor with hands-on experiments.",
  },
  {
    id: "3",
    name: "Anisur Rahman",
    subject: "Python",
    experience: "4 years",
    rating: 4.7,
    image: "https://i.ibb.co.com/gFrS73bt/image.png",
    bio: "Helps students crack university entrance exams.",
  },
  {
    id: "4",
    name: "Faria Hossain",
    subject: "Web App Security",
    experience: "6 years",
    rating: 4.9,
    image:
      "https://i.ibb.co.com/2YnBNLDq/young-woman-with-notebooks-books-study-material-posing-white-background-wears-headphones-1258-217579.jpg",
    bio: "Loves to make biology easy and fun.",
  },
  {
    id: "5",
    name: "Tanvir Alam",
    subject: "Bootcamp",
    experience: "2 years",
    rating: 4.5,
    image: "https://i.ibb.co.com/4wR24RG1/image.png",
    bio: "Focuses on speaking and academic writing.",
  },
  {
    id: "6",
    name: "Tanvir",
    subject: "Javascript",
    experience: "2 years",
    rating: 4.5,
    image: "https://i.ibb.co.com/Kpz5S4SM/image.png",
    bio: "Focuses on speaking and academic writing.",
  },
  {
    id: "7",
    name: "Jhankar mahbub",
    subject: "Java",
    experience: "2 years",
    rating: 4.5,
    image: "https://i.ibb.co.com/4wR24RG1/image.png",
    bio: "https://i.ibb.co.com/Txqc6Thm/image.png",
  },
];

const AllTutor = () => {
  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-2">👩‍🏫 Tutors</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover dedicated tutors who are here to guide, mentor, and help you
          succeed in your academic journey.
        </p>
      </div>
      <Marquee speed={80} gradient={false} pauseOnHover>
        <div className="flex w-auto">
          {tutors.map((tutor) => (
            <Link
              to={`/tutors/${tutor.id}`}
              key={tutor.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl   transition"
            >
              <img
                src={tutor.image}
                alt={`${tutor.name}'s profile`}
                className="w-48 h-48 mx-auto"
              />
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold">{tutor.name}</h2>
                <p className="text-gray-500">{tutor.subject}</p>
                <p className="text-sm text-gray-400">
                  Experience: {tutor.experience}
                </p>
                <p className="text-yellow-500">⭐ {tutor.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default AllTutor;
