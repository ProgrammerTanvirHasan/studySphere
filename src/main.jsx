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
import UploadMaterials from "./components/tutorRoute/uploadMaterials/UploadMaterials.jsx";
import ViewMaterials from "./components/tutorRoute/viewMaterials/ViewMaterials.jsx";
import ViewBooked from "./components/studentRoute/ViewBooked/ViewBooked.jsx";
import CreateNote from "./components/studentRoute/createNote/CreateNote.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SessionDetails from "./components/studySession/sessionDetails/SessionDetails.jsx";
import Payment from "./components/studySession/payment/Payment.jsx";
import BookDetails from "./components/studentRoute/bookDetails/BookDetails.jsx";
import PersonalNote from "./components/studentRoute/personalNote/PersonalNote.jsx";
import Update from "./components/studentRoute/personalNote/update/Update.jsx";

import UpdateForm from "./components/tutorRoute/uploadMaterials/UpdateForm.jsx";
import MaterialsUpdateForm from "./components/tutorRoute/viewMaterials/MaterialsUpdateForm.jsx";
import ShowMaterials from "./components/studentRoute/allStudyMaterials/showMaterials/ShowMaterials.jsx";
import AllStudyMaterials from "./components/studentRoute/allStudyMaterials/AllStudyMaterials.jsx";
import PrivateRoute from "./components/private/PrivateRoute.jsx";
import MainLayout from "./components/MainLayOut.jsx";
import DefaultDashboard from "./components/dashboard/DefaultDashboard.jsx";
import NavSession from "./components/navSession/NavSession.jsx";
import NavTutor from "./components/navTutor/NavTutor.jsx";
import LearningMaterials from "./components/learningMaterials/LearningMaterials.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoggedIn />} />
            <Route path="/register" element={<Register />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<App />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/navSession" element={<NavSession />} />
              <Route path="/navTutor" element={<NavTutor />} />
              <Route
                path="/learningMaterials"
                element={<LearningMaterials />}
              />
              <Route path="/bookedDetails/:title" element={<BookDetails />} />
              <Route path="/update/:_id" element={<Update />} />
              <Route path="/upload/:_id" element={<UpdateForm />} />
              <Route
                path="/showMaterials/:studySessionID"
                element={<ShowMaterials />}
              />
              <Route
                path="/handleUpdate/:_id"
                element={<MaterialsUpdateForm />}
              />
              <Route element={<PrivateRoute />}>
                <Route path="/details/:_id" element={<SessionDetails />} />
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<DefaultDashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="session" element={<Session />} />
                  <Route path="createSession" element={<CreateSession />} />
                  <Route path="allSession" element={<AllSession />} />
                  <Route path="uploadMaterials" element={<UploadMaterials />} />
                  <Route path="viewMaterials" element={<ViewMaterials />} />
                  <Route path="materials" element={<Materials />} />
                  <Route path="ViewBooked" element={<ViewBooked />} />
                  <Route path="createNote" element={<CreateNote />} />
                  <Route path="personalNote" element={<PersonalNote />} />
                  <Route
                    path="allStudyMaterials"
                    element={<AllStudyMaterials />}
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </QueryClientProvider>
);
