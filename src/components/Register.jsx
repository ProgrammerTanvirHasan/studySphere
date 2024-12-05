import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photo);
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .then((error) => {
        console.log(error.message);
      });

    navigate("/login");
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
                <span className="label-text">Photo</span>
              </label>
              <input
                type="text"
                placeholder="image"
                name="photoURL"
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
