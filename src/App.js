import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./pages/MyProfile";
import OpenRoute from "./components/addOns/OpenRoute";
import Error from "./pages/Error";
import ProtectedRoute from "./components/addOns/ProtectedRoute";
import ShowMothers from "./pages/ShowMothers";
import ShowParentsRequest from "./pages/ShowParentsRequest";
import Settings from "../src/pages/Settings/index";
import { useSelector } from "react-redux";
import AddMotherDetails from "./pages/addMotherDetails/index";
import AddParentDetails from "./pages/addParentDetails/index";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.profile)

  console.log('YE HAI USER KI VALUE : ',user);

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login setIsLoggedIn={setIsLoggedIn} />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup setIsLoggedIn={setIsLoggedIn} />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/Education"
          element={
            <div className="flex justify-center items-center text-3xl h-full">
              Welcome to Nav-Shishu Education Page
            </div>
          }
        ></Route>

        <Route
          path="/SurrogacyLaws"
          element={
            <div className="flex justify-center items-center text-3xl h-full">
              Welcome to Nav-Shishu Surrogacy Laws Page
            </div>
          }
        ></Route>

        <Route
          path="/Contact"
          element={
            <div className="flex justify-center items-center text-3xl h-full">
              Welcome to Nav-Shishu Contact Page
            </div>
          }
        ></Route>

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        ></Route>

        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
          <Route path="/dashboard/settings" element={<Settings/>}></Route>
          {
            user?.user?.accountType === 'Surrogate' && (
              <Route path="/dashboard/requests" element={<ShowParentsRequest/>}></Route>
            )
          }
          {
            user?.user?.accountType === 'Parent' && (
              <Route path="/dashboard/showAllSurrogateMothers" element={<ShowMothers/>}></Route>
            )
          }
          {
            user?.user?.accountType === 'Surrogate' && (
              <Route path="/dashboard/add-details-mother" element={<AddMotherDetails/>}></Route>
            )
          }
          {
            user?.user?.accountType === 'Parent' && (
              <Route path="/dashboard/add-details-parent" element={<AddParentDetails/>}></Route>
            )
          }
        </Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
