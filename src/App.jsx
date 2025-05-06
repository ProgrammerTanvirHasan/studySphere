import "./App.css";
import AboutUs from "./components/about/AboutUs";
import AllTutor from "./components/allTutors/AllTutor";
import Banner from "./components/banner/Banner";
import FaqSession from "./components/faq/FaqSession";
import Info from "./components/info/Info";

import StudySession from "./components/studySession/StudySession";

function App() {
  return (
    <>
      <Banner></Banner>
      <StudySession></StudySession>
      <AllTutor></AllTutor>
      <FaqSession></FaqSession>
      <Info></Info>
      <AboutUs></AboutUs>
    </>
  );
}

export default App;
