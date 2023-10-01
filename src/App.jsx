import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/LadingPage/Header";
import Home from "./components/LadingPage/Home";
import Footer from "./components/LadingPage/Footer";
import Explore from "./components/LadingPage/Explore";
import Gain from "./components/LadingPage/Gain";
import Mobile from "./components/LadingPage/Mobile"
import { layout } from "./Layout/Layout";


function App() {
  const location = useLocation();
  const isCryptoListRoute = location.pathname.startsWith("/Crypto");

  return (
    <div className="w-full bg-bgColor text-text1 font-poppins">
      <div className={`${layout.paddingX} ${layout.flexCenter}`}>
        <div className={`${layout.boxWidth}`}>
          <Header />
        </div>
      </div>

      <div className={`${layout.flexStart}`}>
        <div className={`${layout.boxWidth}`}>
          {isCryptoListRoute ? <Outlet /> : (
            <>
              <Home />
              <Explore />
              <Gain />
              <Mobile />
            </>
          )}
        </div>
      </div>

      <div className={`${layout.paddingX} ${layout.flexCenter}`}>
        <div className={`${layout.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
