import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const LoggedIn = () => {
  const { signUser, setUser, googleSignIn, githubSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signUser(email, password)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Login Error:", error.message);
      });
  };

  const handleGoogle = () => {
    googleSignIn(googleProvider)
      .then((result) => {
        setUser(result.user);
        navigate("/");
        console.log(result.user);
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
      });
  };

  const handleGithub = () => {
    githubSignIn(githubProvider)
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error("GitHub Sign-In Error:", error.message);
      });
  };

  return (
    <div>
      <div>
        <img
          className="flex absolute min-h-screen lg:max-w-[1200px] mx-auto p-4"
          src="https://i.ibb.co/B3Np0WX/cyber-security-concept-626203-897.jpg"
          alt=""
        />

        <div className="relative">
          <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <p className="p-4 text-black bg-white px-2 rounded-b-xl rounded-l-xl">
                  If not registered? First registration please!{" "}
                  <Link to={"/register"}>
                    <span className="font-bold text-orange-400 border border-b-orange-400">
                      Register
                    </span>
                  </Link>
                </p>
              </div>
              <div className="card bg-gradient-to-r from-slate-500 to-slate-950 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleLogin} className="card-body">
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
                    <input
                      type="password"
                      placeholder="password"
                      name="password"
                      className="input input-bordered text-black"
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn bg-gradient-to-r from-slate-400 text-lg to-slate-950 text-orange-300">
                      Login
                    </button>
                  </div>
                  <div className="flex justify-around">
                    <button
                      type="button"
                      onClick={handleGoogle}
                      className="text-orange-300"
                    >
                      GOOGLE LOGIN
                    </button>
                    <button
                      type="button"
                      onClick={handleGithub}
                      className="text-orange-300"
                    >
                      GITHUB LOGIN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
