import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../firebase.confiq";
import Swal from "sweetalert2";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const role = form.role.value;
    const email = form.email.value;
    const password = form.password.value;
    const users = { name, email, role };

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        return updateProfile(auth.currentUser, { displayName: name });
      })
      .then(() => {
        fetch("http://localhost:4000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        })
          .then((res) => res.json())
          .then(() => {
            setUser(auth.currentUser);
            navigate("/login");
          })
          .catch((error) =>
            console.error("Error saving user to database:", error)
          );
      })
      .catch((error) => {
        console.error("Registration Error:", error.message);
        Swal.fire({
          title: "Already added this user",
          text: "Please login now",
          icon: "question",
        });
      });
  };

  return (
    <div className="bg-green-900 opacity-80 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <p className="py-6 text-black bg-white px-2 rounded-b-xl rounded-l-xl">
            If Registration is complete, please{" "}
            <Link to="/login">
              <span className="font-bold text-orange-400 border border-b-orange-400">
                Log In now!
              </span>
            </Link>
          </p>
        </div>
        <div className="card bg-gradient-to-r from-slate-500 to-slate-950 w-full max-w-sm shrink-0 shadow-2xl lg:mt-32">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered text-black"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered text-black"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered text-black relative min-w-full"
                  required
                />

                <p
                  onClick={() => setShowPassword(!showPassword)}
                  className="mt-4 text-xl text-black relative -ml-8"
                >
                  {showPassword ? (
                    <FaRegEyeSlash></FaRegEyeSlash>
                  ) : (
                    <MdOutlineRemoveRedEye></MdOutlineRemoveRedEye>
                  )}
                </p>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Select One</span>
              </label>
              <select name="role" className="select  w-full max-w-xs" required>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-gradient-to-r from-slate-400 text-lg to-slate-950 text-orange-300">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
