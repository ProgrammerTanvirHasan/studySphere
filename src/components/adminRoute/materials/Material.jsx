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
        fetch(`http://localhost:27017/material/${_id}`, {
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
    <div>
      <div className=" bg-white rounded-xl shadow-2xl border h-[420px] p-2  border-gray-200 overflow-hidden transition transform hover:scale-[1.01]">
        <img className="w-full h-64 object-cover" src={imageUrl} alt={title} />

        <div>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span className="text-orange-500 font-semibold">
              {studySessionId}
            </span>
            <div className="flex items-center gap-2">
              <FaGoogleDrive className="text-2xl text-blue-500" />
              <Link to={driveLink}>
                <button className="text-blue-600 underline hover:text-blue-800 text-sm font-medium">
                  Google Drive
                </button>
              </Link>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800">{title}</h2>

          <p className="text-sm text-gray-600">{tutorEmail}</p>

          <div className="pt-4">
            <button
              onClick={() => handleDelete(_id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition"
            >
              Remove Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Material;
