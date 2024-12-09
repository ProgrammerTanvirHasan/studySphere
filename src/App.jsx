import "./App.css";
import AllTutor from "./components/allTutors/AllTutor";
import Banner from "./components/banner/Banner";

import Footer from "./components/footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import StudySession from "./components/studySession/StudySession";

function App() {
  return (
    <>
      <Navbar></Navbar>
     <Banner></Banner>
     <StudySession></StudySession>
     <AllTutor></AllTutor>
      <Footer></Footer>
    </>
  );
}

export default App;
