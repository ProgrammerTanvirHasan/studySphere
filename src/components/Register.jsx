import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../firebase.confiq";
import { showSuccess, showError, showErrorModal } from "../utils/toast";
import { apiEndpoint } from "../config/api";
import LoadingSpinner from "./LoadingSpinner";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const role = form.role.value;
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;

    if (!name || !email || !password || !role) {
      showError("Please fill in all fields.", "Missing Information");
      return;
    }

    setIsRegistering(true);
    setIsCheckingEmail(true);

    try {
      const checkResponse = await fetch(
        apiEndpoint(`register/${encodeURIComponent(email)}`),
        {
          credentials: "include",
        }
      );

      const checkData = await checkResponse.json();

      if (checkData.success === true && checkData.email && checkData.role) {
        setIsRegistering(false);
        setIsCheckingEmail(false);
        showError(
          "This email is already registered. Please login instead.",
          "Email Already Exists"
        );
        return;
      }

      setIsCheckingEmail(false);

      const result = await createUser(email, password);
      await updateProfile(auth.currentUser, { displayName: name });

      const saveResponse = await fetch(apiEndpoint("register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
        credentials: "include",
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to save user: ${saveResponse.statusText}`
        );
      }

      const saveData = await saveResponse.json();

      if (!saveData.success && !saveData.user && !saveData.insertedId) {
        throw new Error(
          "User registration completed but data not saved to database"
        );
      }

      setIsRegistering(false);
      setUser(auth.currentUser);
      showSuccess(
        "Account created successfully! Redirecting to login...",
        "Registration Successful! 🎉"
      );
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (error) {
      setIsRegistering(false);
      setIsCheckingEmail(false);
      console.error("Registration Error:", error.message);

      let errorMessage = "Registration failed. Please try again.";

      if (error.message.includes("email-already-in-use")) {
        errorMessage =
          "This email is already registered in Firebase. Please login instead.";
      } else if (error.message.includes("weak-password")) {
        errorMessage =
          "Password is too weak. Please use a stronger password (at least 6 characters).";
      } else if (error.message.includes("invalid-email")) {
        errorMessage = "Invalid email address. Please check and try again.";
      } else if (error.message.includes("Failed to save user")) {
        errorMessage =
          "Account created but failed to save user data. Please try logging in or contact support.";
      } else if (error.message.includes("not saved to database")) {
        errorMessage =
          "Account created but database save failed. Please try logging in.";
      }

      showErrorModal(errorMessage, "Registration Failed");
    }
  };

  return (
    <div className="flex justify-center">
      <div className=" bg-base-300 p-8 rounded-2xl shadow-xl  w-[75vh] h-[100vh]">
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
            disabled={isRegistering}
            className={`btn w-full bg-gradient-to-r from-slate-400 to-slate-950 text-orange-300 text-lg ${
              isRegistering ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isRegistering ? (
              <span className="flex items-center gap-2">
                {isCheckingEmail ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Checking email...
                  </>
                ) : (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating account...
                  </>
                )}
              </span>
            ) : (
              "Register"
            )}
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
