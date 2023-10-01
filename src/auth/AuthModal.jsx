import React, { useState } from "react";
import { ButtonLogin } from "../Layout/Button";
import { Button } from "../Layout/Button";
import Login from "./Login";
import SignUp from "./Signup";

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Button onClick={handleOpen} text="Login"></Button>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full
        flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-5 rounded-lg shadow-md sm:w-[360px]
           xxs:w-[310px]">
            <button
              onClick={handleClose}
              className="text-[20px] xxs:text-[18px] font-bold text-white
               relative float-right bottom-7 left-8 bg-primary
                rounded-full sm:w-[40px] sm:h-[40px] xxs:w-[35px] xxs:h-[35px]
                 flex items-center justify-center shadow-md"
            >
              X
            </button>
            <div
              className="flex items-center justify-center
            ss:text-[20px] xxs:text-[18px] tracking-wider uppercase space-x-4 mb-4"
            >
              <button
                onClick={() => handleSelectTab("login")}
                className={`${
                  activeTab === "login"
                    ? "font-semibold border-primary border-b-2"
                    : "text-gray-600"
                }`}
              >
                Login
              </button>
              <span className="font-semibold">/</span>
              <button
                onClick={() => handleSelectTab("cadastro")}
                className={`${
                  activeTab === "cadastro"
                    ? "font-semibold border-primary border-b-2"
                    : "text-gray-600"
                }`}
              >
                Cadastro
              </button>
            </div>
            <div>{activeTab === "login" ? <Login closeModal={handleClose}/> : <SignUp />}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModal;
