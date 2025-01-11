import { Link } from "react-router-dom";

const Materials = ({ material }) => {
  const { title, _id, textarea } = material;

  return (
    <div className="shadow-2xl p-4 ">
      <h2 className="card-title">{title}</h2>
      <p className="my-4">{textarea}</p>

      <Link to={`/upload/${_id}`}>
        <button className="btn  bg-neutral-600 text-white">
          Upload material
        </button>
      </Link>
    </div>
  );
};

export default Materials;
