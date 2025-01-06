import Swal from "sweetalert2";

const Sessions = ({ session, refetch }) => {
  const { title, textarea, status, amount, _id } = session;

  const handleReject = (_id) => {
    if (status !== "Rejected") {
      Swal.fire({
        title: "Action not allowed!",
        text: "All ready added,You can only send Approval",
        icon: "warning",
        draggable: true,
      });
      return;
    }
    fetch(`http://localhost:4000/session/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Pending" }),
    })
      .then((response) => response.json())
      .then(() => {
        Swal.fire({
          title: "Sending approval successfully",
          icon: "success",
          draggable: true,
        });
        refetch();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
        });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
      refetch();
    });
  };

  const buttonClass =
    status === "Rejected"
      ? "btn bg-red-900 text-white"
      : status === "Pending"
      ? "btn bg-orange-900 text-black"
      : "btn bg-green-900 text-white";

  return (
    <div>
      <div className="card w-full lg:w-96 h-96 bg-neutral-700 lg:ml-8">
        <div className="text-end">
          <button
            onClick={() => handleDelete(_id)}
            className="btn bg-red-700 text-white"
          >
            X
          </button>
        </div>
        <div className="card-body">
          <h2 className="card-title text-white">{title}</h2>
          <p className="text-green-500">{textarea}</p>
          <p className="text-orange-400 text-lg">{amount} Taka</p>
          <div className="card card-actions">
            <btn className={buttonClass} onClick={() => handleReject(_id)}>
              {status === "Rejected" ? "Send Approval !" : status}
            </btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
