import Swal from "sweetalert2";

const Sessions = ({ session, refetch }) => {
  const { title, textarea, status, amount, _id, feedback, reason } = session;

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
    fetch(`https://stydy-sphere-server-vrnk.vercel.app/session/${_id}`, {
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
        fetch(`https://stydy-sphere-server-vrnk.vercel.app/session/${_id}`, {
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
      <div className="bg-cyan-950 lg:ml-8 mb-4 border-b-4 border-orange-400 min-h-96">
        <div className="text-end">
          <button
            onClick={() => handleDelete(_id)}
            className="btn bg-red-700 text-white"
          >
            X
          </button>
        </div>
        <div className="px-4">
          <h2 className="card-title text-white">{title}</h2>
          <p className="text-green-500">{textarea}</p>
          <p className="text-orange-400 text-lg mt-4">{amount} Taka</p>
          <div className="card card-actions mt-6">
            <btn className={buttonClass} onClick={() => handleReject(_id)}>
              {status === "Rejected" ? "Send Approval !" : status}
            </btn>
          </div>
        </div>

        {status === "Rejected" && (
          <>
            <div className="  p-2 mb-8 ">
              <p className="text-xl mt-16">
                <p className=" text-orange-400 border-b-2 border-orange-400 w-40 ">
                  Admin feedback
                </p>
                <span className="text-white">{reason} !</span>
              </p>
              <p>
                <span className="text-white"> {feedback}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sessions;
