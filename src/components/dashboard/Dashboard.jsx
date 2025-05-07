import { NavLink, Outlet } from "react-router-dom";
import { RiAdminLine, RiDashboard2Fill } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";

const Dashboard = () => {
  return (
    <>
      <div className="lg:flex gap-4">
        <div className="flex flex-col bg-[#0d1c3f]/80 text-white pl-4 min-h-dvh lg:w-96">
          <div className="bg-white text-cyan-700 font-bold p-2 rounded-l-full">
            <p className="flex items-center">
              <RiDashboard2Fill className="text-2xl mr-2" />
              Dashboard
            </p>
          </div>
          <details className="py-2">
            <summary className="flex items-center gap-2 cursor-pointer text-white">
              <RiAdminLine className="text-2xl" />
              Admin
            </summary>
            <div className="flex flex-col py-2 text-sm pl-10">
              <NavLink
                to="/dashboard/users"
                className={({ isActive }) => (isActive ? "font-bold" : "")}
              >
                <button className="italic  mb-2">View all users</button>
              </NavLink>

              <NavLink
                to="/dashboard/session"
                className={({ isActive }) => (isActive ? " font-bold" : "")}
              >
                <button className="italic mb-2">View all study sessions</button>
              </NavLink>
              <NavLink
                to="/dashboard/materials"
                className={({ isActive }) => (isActive ? " font-bold" : "")}
              >
                <button className="italic mb-2">View all materials</button>
              </NavLink>
            </div>
          </details>
          <details className="py-2">
            <summary className="flex items-center gap-2 cursor-pointer text-white">
              <GiTeacher className="text-2xl" />
              Tutor
            </summary>
            <div className="flex flex-col py-2 text-sm pl-10">
              <NavLink
                to="/dashboard/createSession"
                className={({ isActive }) => (isActive ? " font-bold" : "")}
              >
                <button className="italic mb-2">Create study session</button>
              </NavLink>
              <NavLink
                to="/dashboard/allSession"
                className={({ isActive }) => (isActive ? " font-bold" : "")}
              >
                <button className="italic mb-2">View tutor's sessions</button>
              </NavLink>
              <NavLink
                to="/dashboard/uploadMaterials"
                className={({ isActive }) => (isActive ? " font-bold" : "")}
              >
                <button className="italic mb-2">Upload materials</button>
              </NavLink>
              <NavLink
                to="/dashboard/viewMaterials"
                className={({ isActive }) => (isActive ? " font-bold" : "")}
              >
                <button className="italic mb-2">View materials</button>
              </NavLink>
            </div>
          </details>
          <details className="py-2">
            <summary className="flex items-center gap-2 cursor-pointer text-white">
              <PiStudentBold className="text-2xl" />
              Student
            </summary>
            <div className="flex flex-col py-2 text-sm pl-10">
              <NavLink
                to="/dashboard/ViewBooked"
                className={({ isActive }) => (isActive ? " font-bold" : "")}
              >
                <button className="italic mb-2">View booked sessions</button>
              </NavLink>
              <NavLink
                to="/dashboard/createNote"
                className={({ isActive }) => (isActive ? " font-bold" : "")}
              >
                <button className="italic mb-2">Create note</button>
              </NavLink>
              <NavLink
                to="/dashboard/personalNote"
                className={({ isActive }) => (isActive ? " font-bold" : "")}
              >
                <button className="italic mb-2">Manage personal notes</button>
              </NavLink>
              <NavLink
                to="/dashboard/allStudyMaterials"
                className={({ isActive }) => (isActive ? " font-bold" : "")}
              >
                <button className="italic mb-2 pr-2">
                  View all tutor materials
                </button>
              </NavLink>
            </div>
          </details>
          <div className="pt-8 flex gap-2">
            <IoMdSettings className="text-lg mt-1"></IoMdSettings>
            <p>Settings</p>
          </div>
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
