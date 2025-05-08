import { Link } from "react-router-dom";

const Materials = ({ material }) => {
  const { title, _id, textarea } = material;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 container mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{textarea}</p>

      <Link to={`/upload/${_id}`}>
        <button className="px-5 py-2 bg-green-600 hover:bg-green-900 text-white rounded-lg text-sm font-medium transition duration-200">
          Upload Material
        </button>
      </Link>
    </div>
  );
};

export default Materials;
