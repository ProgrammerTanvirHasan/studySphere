import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 ">
      <div className="grid-cols-1 flex flex-col bg-green-900 text-white pl-4 min-h-dvh">
        <div className="text-2xl border flex gap-2 py-2">
          <FaHome className="text-3xl"></FaHome>
          <NavLink to="/">Home</NavLink>
        </div>

        <div className="border ">
          <div className="flex gap-2 py-2">
            <RiAdminLine className="text-2xl"></RiAdminLine>
            <h2 className="text-orange-300">Admin dashboard</h2>
          </div>
          <div className="flex flex-col py-2 text-sm">
            <NavLink to="/dashboard/users">
              <button className="glass mb-2">1.View all users</button>
            </NavLink>
            <NavLink to="/dashboard/session">
              <button className="glass mb-2">2.View all study session</button>
            </NavLink>
            <NavLink to="/dashboard/materials">
              <button className="glass mb-2">3.View all materials</button>
            </NavLink>
          </div>
        </div>

        <div className="border ">
          <div className="flex gap-2 py-2 ">
            <GiTeacher className="text-2xl"></GiTeacher>
            <h2 className="text-orange-300">Tutor dashboard</h2>
          </div>
          <div className="flex flex-col py-2 text-sm">
            <NavLink to="/dashboard/createSession">
              <button className="glass mb-2">1.Create study session</button>
            </NavLink>
            <NavLink to="/dashboard/allSession">
              <button className="glass mb-2">
                2.View all study sessions created by a tutor
              </button>
            </NavLink>
            <NavLink to="/dashboard/uploadMaterials">
              <button className="glass mb-2">3.Upload materials</button>
            </NavLink>
            <NavLink to="/dashboard/viewMaterials">
              <button className="glass mb-2">4.View all material</button>
            </NavLink>
          </div>
        </div>

        <div className="border   ">
          <div className="flex gap-2 py-2">
            <PiStudentBold className="text-2xl"></PiStudentBold>
            <h2 className="text-orange-300">Student dashboard</h2>
          </div>
          <div className="flex flex-col py-2 text-sm">
            <NavLink to="/dashboard/ViewBooked">
              <button className="glass mb-2">1.View booked session</button>
            </NavLink>
            <NavLink to="/dashboard/createNote">
              <button className="glass mb-2">2.Create note</button>
            </NavLink>
            <NavLink to="/dashboard/personalNote">
              <button className="glass mb-2">3.Manage personal notes</button>
            </NavLink>
            <NavLink to="/dashboard/allStudyMaterials">
              <button className="glass mb-2">
                4.View all study materials provided by the tutor
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      <div className=" grid-cols-2"></div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
