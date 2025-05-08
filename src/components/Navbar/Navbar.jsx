import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { RiMenu2Line } from "react-icons/ri";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, loggedOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const email = user?.email;

  const handleLogout = () => {
    loggedOut()
      .then(() => {
        Swal.fire({
          title: "Logged out",
          text: "User logged out successfully",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log("Error during logout:", error.message);
      });
  };

  const links = [
    { title: "Home", path: "/" },
    { title: "All Session", path: "/navSession" },
    { title: "All Tutor", path: "/navTutor" },
    { title: "Learning Materials", path: "/learningMaterials" },
    { title: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav
      className=" bg-[#0d1c3f]/80
 shadow-md text-white"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <NavLink to={"/"} className="text-2xl font-bold ">
          StudySphere
        </NavLink>

        <ul className="hidden lg:flex items-center space-x-8 font-medium text-lg">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-orange-200 transition ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-white text-orange-700 px-4 py-2 rounded-full hover:bg-orange-100 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink to="/login">
              <button className="bg-white text-orange-700 px-4 py-2 rounded-full hover:bg-orange-100 transition">
                Log In
              </button>
            </NavLink>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-3xl"
        >
          <RiMenu2Line />
        </button>
      </div>

      <div
        className={`lg:hidden px-6 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 py-4 text-lg">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded hover:bg-white/20 ${
                    isActive ? "text-yellow-300" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="pb-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 rounded-full hover:from-red-500 hover:to-orange-600 transition"
            >
              Log Out
            </button>
          ) : (
            <NavLink to="/login">
              <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-full hover:from-teal-500 hover:to-green-600 transition">
                Log In
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
