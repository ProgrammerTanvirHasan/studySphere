import { FaGoogleDrive } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Material = ({ items, refetch }) => {
  const { title, studySessionId, tutorEmail, driveLink, imageUrl, _id } = items;

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
        fetch(`https://stydy-sphere-server-vrnk.vercel.app/material/${_id}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the file.",
              icon: "error",
            });
          }
        });
      }
    });
  };

  return (
    <div className="pt-8 w-96  shadow-2xl rounded-md border-b-4 border-orange-300">
      <img className="w-96 h-64" src={imageUrl} alt={title} />
      <div className="flex justify-between">
        <p className="text-orange-400">{studySessionId}</p>
        <div className="flex ">
          <p className="text-2xl">
            <FaGoogleDrive></FaGoogleDrive>
          </p>
          <Link to={driveLink}>
            <button className="text-sm  border-b-4 border-black">
              Google Drive
            </button>
          </Link>
        </div>
      </div>
      <h2 className="card-title ">{title}</h2>
      <p>{tutorEmail}</p>
      <div className="pt-6 pb-2">
        <button
          onClick={() => handleDelete(_id)}
          className="bg-red-700 text-white px-2 rounded-sm"
        >
          Remove Content
        </button>
      </div>
    </div>
  );
};

export default Material;
