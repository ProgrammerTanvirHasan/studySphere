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
    <div className="bg-emerald-900 border-b-2 border-orange-300 text-white py-4 px-2 rounded-md">
      <h2 className="text-xl">{name}</h2>
      <p>{email}</p>
      <div className="flex justify-between">
        <p className="btn bg-orange-400 mt-2">{role}</p>

        <div
          disabled={role === "admin"}
          onClick={() => handleRole(_id)}
          className="mt-2 btn bg-green-400 glass"
        >
          Make Admin
        </div>
      </div>
    </div>
  );
};

export default User;
