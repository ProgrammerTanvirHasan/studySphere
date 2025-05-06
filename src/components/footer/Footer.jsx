import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#0d1c3f]  rounded-b-xl  ">
      <footer className="footer footer-center  rounded p-10 text-white h-80">
        <nav className="grid grid-flow-col gap-4 text-xl">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaTwitter className="text-4xl"></FaTwitter>
            </a>
            <a>
              <FaYoutube className="text-4xl"></FaYoutube>
            </a>
            <a>
              <FaFacebook className="text-4xl"></FaFacebook>
            </a>
          </div>
        </nav>
        <aside>
          <p className="border-b-2">
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
