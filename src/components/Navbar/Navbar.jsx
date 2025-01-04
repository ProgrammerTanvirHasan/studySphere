import { useContext } from "react";
import { GiBookAura } from "react-icons/gi";
import { NavLink } from "react-router";
import { AuthContext } from "../../AuthProvider";
import { RiDashboardFill } from "react-icons/ri";

const Navbar = () => {
  const { user, loggedOut } = useContext(AuthContext);
  const email = user?.email;

  const handleLogout = () => {
    loggedOut()
      .then(() => {})
      .then((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="bg-orange-500 bg-opacity-60 shadow-2xl ">
      <div className="navbar ">
        <div className="flex-none ">
          <GiBookAura className="w-8 h-8"></GiBookAura>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">StudySphere</a>
        </div>

        <div>
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="btn glass text-stone-900 font-semibold text-lg"
              >
                LogOut
              </button>

              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User Avatar"
                  />
                </div>
                <div className="ml-4">
                  <NavLink to="/dashboard">
                    <button>
                      {" "}
                      <RiDashboardFill className="text-5xl"></RiDashboardFill>
                    </button>
                  </NavLink>
                </div>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <button className="btn glass text-stone-900 font-semibold text-lg">
                  LogIn
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end text-sm mr-12">{email}</div>
    </div>
  );
};

export default Navbar;
