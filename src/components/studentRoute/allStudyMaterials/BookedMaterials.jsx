import { Link } from "react-router";

const BookedMaterials = ({ materials }) => {
  const { title, textarea, tutorEmail, Tutor, studySessionID } = materials;

  return (
    <div className="mb-8 shadow-2xl p-2 border-b-2 border-orange-600">
      <h2 className="card-title">{title}</h2>
      <p>{textarea}</p>
      <p> Tutor : {Tutor}</p>
      <div className="flex justify-between">
        <p>Tutor Email : {tutorEmail}</p>
        <div>
          <Link to={`/showMaterials/${studySessionID}`}>
            <button className="bg-orange-800 text-white px-4 py-1 rounded-xl">
              Show materials
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookedMaterials;
