import { FiMail } from "react-icons/fi";
import Swal from "sweetalert2";

const User = ({ users, refetch }) => {
  const { name, email, role, _id } = users;

  const handleRole = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to change the role to admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/register/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: "admin" }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: `The role has been updated to admin.`,
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="bg-white border border-b-teal-300 shadow-md rounded-xl p-5 text-gray-800 space-y-4">
      <div className="text-xl font-semibold">
        {name}
        <span className="text-sm font-medium text-gray-500 ml-2">({role})</span>
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <FiMail className="mr-2" />
        {email}
      </div>

      <div className="pt-2">
        <button
          disabled={role === "admin"}
          onClick={() => handleRole(_id)}
          className={`w-full px-5 py-2 rounded-lg text-sm font-semibold transition duration-300 shadow ${
            role === "admin"
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          }`}
        >
          Make Admin
        </button>
      </div>
    </div>
  );
};

export default User;
