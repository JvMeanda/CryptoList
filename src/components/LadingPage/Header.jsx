import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "../../Layout/Button";
import { TbMenu2, TbX } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import AuthModal from "../../auth/AuthModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../auth/firebase";
import UserMenu from "../../auth/UserMenu";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const params = useParams();

  const isCryptoRoute = location.pathname === "/Crypto";
  const isCryptoRouteID = location.pathname === `/Crypto/${params.id}`;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const navLinks = [
    { to: "Home", text: "Home" },
    { to: "Explore", text: "Explore" },
    { to: "Gain", text: "Ganhe" },
    { to: "APP", text: "App" },
  ];

  const toggleMenu = () => {
    setToggle((prev) => !prev);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  return (
    <div className="border-b fixed w-full z-50 left-0 bg-bgColor">
      <nav className="container w-full mx-auto py-2">
        {/* LARGER SCREENS */}

        <div className="flex items-center justify-between">
          <RouterLink to="/">
            <h1 className="text-[42px] font-semibold pl-2 md:pl-0">
              Dev<span className="text-primary">Coin</span>
            </h1>
          </RouterLink>
          <ul
            className="text-[16px] font-semibold tracking-wider list-none
             md:flex hidden justify-center items-center space-x-12"
          >
            {navLinks.map(({ to, text }) => (
              <li key={text}>
                {isCryptoRoute || isCryptoRouteID ? (
                  <RouterLink to="/" className="cursor-pointer hover:underline">
                    {text}
                  </RouterLink>
                ) : (
                  <ScrollLink
                    to={to}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="cursor-pointer hover:underline"
                  >
                    {text}
                  </ScrollLink>
                )}
              </li>
            ))}
          </ul>
          <div className="md:flex hidden items-center space-x-8">
            {user ? (
              <>
                <Button text="Conectar Carteira" />
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <AiOutlineUser className="text-2xl" />
                </button>
                {userMenuOpen && <UserMenu toggleMenuIcon={closeUserMenu} />}
              </>
            ) : (
              <AuthModal />
            )}
          </div>

          {/* SMALL SCREENS */}

          <div
            className="md:hidden flex justify-between items-center
           pr-2 md:pr-0 space-x-4"
          >
            {toggle ? (
              <TbX className="text-[30px] ml-6" onClick={toggleMenu} />
            ) : (
              <TbMenu2 className="text-[30px] ml-6" onClick={toggleMenu} />
            )}

            {user && (
              <>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <AiOutlineUser className="text-2xl" />
                </button>
                {userMenuOpen && <UserMenu toggleMenuIcon={closeUserMenu} />}
              </>
            )}

            <div
              className={`${toggle ? "flex flex-col" : "hidden"} flex-col 
              container list-none absolute top-[80px] -left-4 
              text-[20px] z-50 bg-bgColor min-w-full
              shadow-md`}
            >
              {navLinks.map(({ to, text }) => (
                <li key={text} className="py-4 border-b">
                  {isCryptoRoute ? (
                    <RouterLink
                      to="/"
                      className="cursor-pointer hover:underline ml-6"
                    >
                      {text}
                    </RouterLink>
                  ) : (
                    <ScrollLink
                      to={to}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className="cursor-pointer hover:underline ml-6"
                    >
                      {text}
                    </ScrollLink>
                  )}
                </li>
              ))}
              <div className="flex justify-center items-center my-4 space-x-6">
                {user ? (
                  <>
                    <Button text="Conectar Carteira" />
                  </>
                ) : (
                  <AuthModal />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
