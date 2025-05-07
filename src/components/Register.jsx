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
        return updateProfile(auth.currentUser, { displayName: name });
      })
      .then(() => {
        fetch("https://stydy-sphere-server-vrnk.vercel.app/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
          title: "User Already Exists",
          text: "Please login now.",
          icon: "question",
        });
      });
  };

  return (
    <div className="">
      <div className="bg-white p-8 rounded-2xl shadow-xl container mx-auto w-full">
        <h2 className="text-3xl font-bold mb-2 text-center text-slate-800">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Join StudySphere to connect, learn, and grow.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label-text">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="input input-bordered w-full text-black"
              required
            />
          </div>

          <div>
            <label className="label-text">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="input input-bordered w-full text-black"
              required
            />
          </div>

          <div>
            <label className="label-text">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full text-black pr-10"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-xl cursor-pointer text-gray-600"
              >
                {showPassword ? <FaRegEyeSlash /> : <MdOutlineRemoveRedEye />}
              </span>
            </div>
          </div>

          <div>
            <label className="label-text">Select Role</label>
            <select name="role" className="select w-full text-black" required>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-slate-400 to-slate-950 text-orange-300 text-lg"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-blue-600 hover:underline"
            >
              ← Go Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
