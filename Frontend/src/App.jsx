import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route , Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { axiosInstance } from "./lib/axios";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

function App() {
  //get the authorised user
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore(); //these are the states from the zustand state management

  //as soon as app is loaded get the authorised user.
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  //while loading the user show an animation of a loader
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      {/* //At the top of every page we want a navbar */}
      <Navbar />
      <Routes>

        {/* //if an authorised user then only get to the home page  */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}/>

        {/* // If the user is not logged in then only get to the signup page */}
        <Route path="/signup" element={!authUser?<SignUpPage />:<Navigate to="/"  />}/>
        
        {/* // If the user is not logged in then only get to the login page */}
        <Route path="/login" element={ !authUser ? <LoginPage />: <Navigate to="/"/>} />

        
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
