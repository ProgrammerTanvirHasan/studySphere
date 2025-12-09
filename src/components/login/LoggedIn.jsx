import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { showError, showSuccess } from "../../utils/toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const LoggedIn = () => {
  const { signUser, setUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;

    if (!email || !password) {
      showError(
        "Please fill in both email and password fields.",
        "Missing Information"
      );
      return;
    }

    setIsLoggingIn(true);

    try {
      const result = await signUser(email, password);
      setUser(result.user);
      showSuccess("Welcome back! Redirecting...", "Login Successful! 🎉");
      setTimeout(() => {
        const fromPath = location?.state?.from || location?.state;
        const destination =
          fromPath && fromPath !== "/login" ? fromPath : "/dashboard";
        navigate(destination, { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Login Error:", error.message);
      let errorMessage = "Something went wrong! Please try again.";

      if (error.message.includes("user-not-found")) {
        errorMessage =
          "No account found with this email. Please register first.";
      } else if (error.message.includes("wrong-password")) {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.message.includes("invalid-email")) {
        errorMessage = "Invalid email address. Please check and try again.";
      } else if (error.message.includes("too-many-requests")) {
        errorMessage = "Too many failed attempts. Please try again later.";
      }

      showError(errorMessage, "Login Failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn(googleProvider);
      setUser(result.user);
      showSuccess("Welcome! Redirecting...", "Google Sign-In Successful! 🎉");
      setTimeout(() => {
        const fromPath = location?.state?.from || location?.state;
        const destination =
          fromPath && fromPath !== "/login" ? fromPath : "/dashboard";
        navigate(destination, { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      showError("Google sign-in failed. Please try again.", "Sign-In Failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className=" bg-base-300 p-8 rounded-2xl shadow-xl w-[75vh] h-[100vh]">
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
            disabled={isLoggingIn}
            className={`btn w-full bg-gradient-to-r from-slate-400 to-slate-950 text-orange-300 text-lg ${
              isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={isLoggingIn}
              className={`w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition ${
                isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingIn ? "Please wait..." : "Sign in with Google"}
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
