import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const LoggedIn = () => {
  const { signUser, setUser, googleSignIn, githubSignIn } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signUser(email, password)
      .then((result) => {
        setUser(result.user);
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        console.error("Login Error:", error.message);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong! Please try again.",
          icon: "error",
        });
      });
  };

  const handleGoogle = () => {
    googleSignIn(googleProvider)
      .then((result) => {
        setUser(result.user);
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
      });
  };

  const handleGithub = () => {
    githubSignIn(githubProvider)
      .then((result) => {
        setUser(result.user);
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        console.error("GitHub Sign-In Error:", error.message);
      });
  };

  return (
    <div className="">
      <div className="bg-white p-8 rounded-2xl shadow-xl container mx-auto w-full">
        <h2 className="text-3xl font-bold mb-2 text-center text-slate-800">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Log in to continue your journey with StudySphere.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
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

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-slate-400 to-slate-950 text-orange-300 text-lg"
          >
            Login
          </button>

          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={handleGoogle}
              className="w-[48%] bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
            >
              Google
            </button>
            <button
              type="button"
              onClick={handleGithub}
              className="w-[48%] bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition"
            >
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register here
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
        </form>
      </div>
    </div>
  );
};

export default LoggedIn;
