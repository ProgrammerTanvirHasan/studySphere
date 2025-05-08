import Swal from "sweetalert2";

const Sessions = ({ session, refetch }) => {
  const { title, textarea, status, amount, _id, feedback, reason } = session;

  const handleReject = (_id) => {
    if (status !== "Rejected") {
      Swal.fire({
        title: "Action not allowed!",
        text: "Already added. You can only send approval.",
        icon: "warning",
      });
      return;
    }

    fetch(`http://localhost:27017/session/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Pending" }),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Sent!", "Approval request has been sent.", "success");
        refetch();
      })
      .catch((error) => console.error(error.message));
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:27017/session/${_id}`, {
          method: "DELETE",
        });

        Swal.fire("Deleted!", "Session has been removed.", "success");
        refetch();
      }
    });
  };

  const getStatusColor = () => {
    if (status === "Rejected") return "bg-red-600";
    if (status === "Pending") return "bg-yellow-500";
    return "bg-green-600";
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 relative  mx-auto">
        <button
          onClick={() => handleDelete(_id)}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-lg font-bold"
          title="Delete Session"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-3">{textarea}</p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-medium text-green-700">
            Fee: <span className="font-bold">{amount} ৳</span>
          </p>
          <button
            onClick={() => handleReject(_id)}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${getStatusColor()}`}
          >
            {status === "Rejected" ? "Send Approval" : status}
          </button>
        </div>

        {status === "Rejected" && (
          <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-300">
            <p className="text-red-600 font-semibold mb-2">Admin Feedback:</p>
            <p className="text-sm text-gray-800 mb-1">{reason}</p>
            <p className="text-sm text-gray-700 italic">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
