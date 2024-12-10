import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

import Register from "./components/Register.jsx";
import AuthProvider from "./AuthProvider.jsx";
import LoggedIn from "./components/login/LoggedIn.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Session from "./components/adminRoute/session/Session.jsx";
import Users from "./components/adminRoute/users/Users.jsx";
import Materials from "./components/adminRoute/materials/Materials.jsx";
import CreateSession from "./components/tutorRoute/createSession/CreateSession.jsx";
import AllSession from "./components/tutorRoute/allSession/AllSession.jsx";
import UploadMaterials from "./components/tutorRoute/UploadMaterials/UploadMaterials.jsx";
import ViewMaterials from "./components/tutorRoute/ViewMaterials/ViewMaterials.jsx";
import ViewBooked from "./components/studentRoute/ViewBooked/ViewBooked.jsx";
import CreateNote from "./components/studentRoute/CreateNote/CreateNote.jsx";
import PersonalNote from "./components/studentRoute/PersonalNote/PersonalNote.jsx";
import AllStudyMaterials from "./components/studentRoute/AllStudyMaterials/AllStudyMaterials.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SessionDetails from "./components/studySession/sessionDetails/SessionDetails.jsx";
import Payment from "./components/studySession/payment/Payment.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <div className="max-w-[1200px] mx-auto">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoggedIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details/:_id" element={<SessionDetails />} />
            <Route path="/payment" element={<Payment />} />

            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="session" element={<Session />} />
              <Route path="createSession" element={<CreateSession />} />
              <Route path="allSession" element={<AllSession />} />
              <Route path="uploadMaterials" element={<UploadMaterials />} />
              <Route path="viewMaterials" element={<ViewMaterials />} />
              <Route path="materials" element={<Materials />} />

              <Route path="ViewBooked" element={< ViewBooked />} />
              <Route path="createNote" element={<CreateNote />} />
              <Route path="personalNote" element={<PersonalNote />} />
              <Route path="allStudyMaterials" element={<AllStudyMaterials />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);
