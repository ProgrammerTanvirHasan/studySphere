import { FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminSession = ({ session, refetch }) => {
  const { title, textarea, status, amount, _id } = session;
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
        fetch(`http://localhost:4000/session/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          })
          .catch((error) => {
            console.error("Error deleting note:", error);
            Swal.fire("Error", "Failed to delete the note.", "error");
          });
      }
    });
  };

  const handleApproved = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve it",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/session/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Approved" }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "The status has been updated to Approved.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="card bg-neutral text-neutral-content ">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{textarea}</p>
        <div>
          <p>
            <FaDollarSign className="text-orange-300 text-2xl"></FaDollarSign>
            <span className="text-xl">{amount}</span>
          </p>
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleApproved(_id)}
            className={`btn ${status === "Pending" ? "bg-yellow-500 text-black" : "bg-green-600 text-white"}`}
          >
            {status}
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="btn bg-red-700 text-white"
          >
            Rejected
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSession;
