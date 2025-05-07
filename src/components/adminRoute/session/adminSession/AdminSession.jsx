import Swal from "sweetalert2";

const AdminSession = ({ session, refetch, index }) => {
  const { title, status, textarea, _id } = session;

  const updateSession = async (data) => {
    try {
      const res = await fetch(`http://localhost:4000/session/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Error updating session:", error);
      Swal.fire(
        "Error",
        "An error occurred while updating the session.",
        "error"
      );
    }
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Rejection reason!",
      input: "text",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((reasonResult) => {
      if (reasonResult.isConfirmed) {
        const reason = reasonResult.value;
        Swal.fire({
          title: "Your feedback",
          input: "text",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
        }).then((feedbackResult) => {
          if (feedbackResult.isConfirmed) {
            const feedback = feedbackResult.value;

            updateSession({ reason, feedback, status: "Rejected" }).then(
              (data) => {
                if (data?.modifiedCount > 0) {
                  Swal.fire({
                    title: "Success!",
                    text: "The session has been rejected.",
                    icon: "success",
                  });
                  refetch();
                }
              }
            );
          }
        });
      }
    });
  };

  const handleApproved = (_id) => {
    Swal.fire({
      title: "Is the session free or paid?",
      input: "radio",
      inputOptions: {
        free: "Free",
        paid: "Paid",
      },
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const isPaid = result.value === "paid";

        if (isPaid) {
          Swal.fire({
            title: "Enter the amount for the session",
            input: "number",
            inputAttributes: {
              min: 1,
              step: 1,
            },
            showCancelButton: true,
            confirmButtonText: "Confirm Amount",
          }).then((amountResult) => {
            if (amountResult.isConfirmed) {
              const amount = parseInt(amountResult.value, 10) || 0;

              updateSession({ status: "Approved", amount }).then((data) => {
                if (data?.modifiedCount > 0) {
                  Swal.fire({
                    title: "Success!",
                    text: "The session has been approved with a fee.",
                    icon: "success",
                  });
                  refetch();
                }
              });
            }
          });
        } else {
          updateSession({ status: "Approved", amount: 0 }).then((data) => {
            if (data?.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "The session has been approved as Free.",
                icon: "success",
              });
              refetch();
            }
          });
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl mb-6">
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start md:items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        </div>

        <div>
          <p className="text-gray-700 text-base">{textarea}</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => handleApproved(_id)}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200 shadow ${
              status === "Pending"
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={status === "Approved"}
          >
            {status === "Approved" ? "Approved" : "Approve"}
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition duration-200 shadow"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSession;
