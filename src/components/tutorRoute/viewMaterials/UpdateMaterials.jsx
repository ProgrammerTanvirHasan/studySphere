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
        fetch(`http://localhost:4000/material/${_id}`, {
          method: "DELETE",
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
    <div>
      <img className="h-72 w-full lg:w-96" src={imageUrl} alt={title} />
      <h2 className="card-title">{title}</h2>
      <div className="mt-2 ">
        <Link to={`/handleUpdate/${_id}`}>
          <button className="px-4 rounded-xl bg-green-950 text-white mr-2">
            Update
          </button>
        </Link>
        <button
          onClick={() => handleDelete(_id)}
          className="px-4 rounded-xl bg-red-950 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UpdateMaterials;
