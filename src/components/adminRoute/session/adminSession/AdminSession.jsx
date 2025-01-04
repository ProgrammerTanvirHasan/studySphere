import Swal from "sweetalert2";

const AdminSession = ({ session, refetch, index }) => {
  const { title, status, textarea, _id } = session;

  const handleDelete = (_id) => {
    fetch(`http://localhost:4000/session/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Rejected" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "The session has been rejected.",
            icon: "success",
          });
          refetch();
        }
      });
  };

  const handleApproved = (_id) => {
    Swal.fire({
      title: " Is the session free or paid?",

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
          }).then((result) => {
            if (result.isConfirmed) {
              const amount = parseInt(result.value, 10) || 0;
              fetch(`http://localhost:4000/session/${_id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "Approved", amount }),
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
        } else {
          fetch(`http://localhost:4000/session/${_id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Approved", amount: 0 }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount > 0) {
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
    <div className="card bg-slate-300 border-b-4 ">
      <div className="p-2 grid grid-cols-3">
        <div className="flex gap-4">
          <p className="font-bold text-lg">{index + 1}</p>
          <h2 className="font-bold">{title}</h2>
        </div>

        <div className="ml-8 ">
          <p className="text-xl  ">{textarea}</p>
        </div>

        <div className="card-actions justify-end">
          <button
            onClick={() => handleApproved(_id)}
            className={`p-2 rounded-lg  ${
              status === "Pending"
                ? "bg-yellow-500 text-black"
                : "bg-green-600 text-white  "
            }`}
            disabled={status === "Approved"}
          >
            Approve
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="p-2 rounded-lg bg-red-700 text-white "
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSession;
