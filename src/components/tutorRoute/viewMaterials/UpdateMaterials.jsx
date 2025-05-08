import { Link } from "react-router";
import Swal from "sweetalert2";

const UpdateMaterials = ({ materials, refetch }) => {
  const { _id, title, imageUrl } = materials;

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://stydy-sphere-server.vercel.app/material/${_id}`, {
          method: "DELETE",
          credentials: "include",
        }).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        });
      }
    });
  };

  return (
    <div className="bg-white shadow-lg p-4 hover:scale-105 transition">
      <img className="h-72 w-full  " src={imageUrl} alt={title} />
      <h2 className="card-title">{title}</h2>
      <div className="mt-2 ">
        <Link to={`/handleUpdate/${_id}`}>
          <button className="px-4 rounded-xl bg-cyan-700 text-white mr-2">
            Update
          </button>
        </Link>
        <button
          onClick={() => handleDelete(_id)}
          className="px-4 rounded-xl bg-red-700 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UpdateMaterials;
