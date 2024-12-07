import React, { useState } from "react";
import CreateAccount from "../auth/CreateAccount";
import Login from "../auth/Login";
import OTPVerification from "../auth/OTPVerification";
import Register from "../auth/Register";
import ResetPassword from "../auth/ResetPassword";

const LoginRegistrationModal = ({ currentView, setCurrentView }) => {
  const [view, setView] = useState({ screen: "", source: "" });
  const renderView = () => {
    switch (currentView) {
      case "login":
        setCurrentView("login");
        return (
          <Login
            source={view.source}
            switchToRegister={(source) => {
              setView({ screen: "register", source });
              setCurrentView("register");
            }}
          />
        );
      case "register":
        setCurrentView("register");
        return (
          <Register
            source={view.source}
            switchToLogin={() => {
              setView({ screen: "login", source: "" });
              setCurrentView("login");
            }}
            switchToOTPVerification={(source) => {
              setView({ screen: "otp-verification", source });
              setCurrentView("otp-verification");
            }}
          />
        );
      case "otp-verification":
        setCurrentView("otp-verification");
        return (
          <OTPVerification
            source={view.source}
            switchToLogin={() => {
              setView({ screen: "login", source: "" });
              setCurrentView("login");
            }}
            switchToCreateAccount={(source) => {
              setView({ screen: "create-account", source });
              setCurrentView("create-account");
            }}
            switchToResetPassword={(source) => {
              setView({ screen: "reset-password", source });
              setCurrentView("reset-password");
            }}
          />
        );
      case "create-account":
        setCurrentView("create-account");
        return (
          <CreateAccount
            switchToLogin={() => {
              setView({ screen: "login", source: "" });
              setCurrentView("login");
            }}
          />
        );
      case "reset-password":
        setCurrentView("reset-password");
        return (
          <ResetPassword
            switchToLogin={() => {
              setView({ screen: "login", source: "" });
              setCurrentView("login");
            }}
          />
        );
      default:
        setCurrentView("login");
        return (
          <Login
            source={view.source}
            switchToRegister={(source) => {
              setView({ screen: "register", source });
              setCurrentView("register");
            }}
          />
        );
    }
  };
  return <div>{renderView()}</div>;
};
export default LoginRegistrationModal;
