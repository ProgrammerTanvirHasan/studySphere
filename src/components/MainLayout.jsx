import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
