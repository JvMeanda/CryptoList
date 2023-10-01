import React, { useEffect, useState } from "react";
import { auth, dataBase } from "./firebase";
import { FiChevronLeft } from "react-icons/fi";
import EditedUserImg from "./EditedUserImg";
import { useGlobalState } from "../Layout/GlobalState";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Alert from "../Layout/Alert";

const UserMenu = ({ toggleMenuIcon }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [alert, setAlert] = useState(null);
  const { favoriteCoins, removeToWatchListGlobal, user } = useGlobalState();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userEmail = user.email || "";

      setUserEmail(userEmail);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const removeFromFavorites = async (coinId, coinName) => {
    const coinRef = doc(dataBase, "watchlist", user.uid);

    try {
      const coinDoc = await getDoc(coinRef);

      if (coinDoc.exists()) {
        const watchListData = coinDoc.data();
        const updatedWatchList = (watchListData.crypto || []).filter(
          (id) => id !== coinId
        );

        await setDoc(coinRef, {
          crypto: updatedWatchList,
        });

        setAlert({
          type: "success",
          message: `${coinId} removido dos favoritos!`,
        });

        removeToWatchListGlobal(coinId); // Chame a função global
      } else {
        setAlert({
          type: "error",
          message: `${coinId} não está na lista de favoritos!`,
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: `Erro ao remover ${coinName} dos favoritos.`,
      });
    }
  };

  return (
    <div
      className="fixed top-0 right-0 w-full h-full
    flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className={`${menuOpen ? "right-0" : "-right-full"} w-full 
  bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] 
  xl:max-w-[20vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
      >
        <div>
          <div
            className="my-4 px-1 cursor-pointer flex items-center
          max-w-min"
            onClick={() => {
              toggleMenu();
              toggleMenuIcon();
            }}
          >
            <FiChevronLeft className="text-[24px]" />
            <p className="text-[16px] mt-0.5 font-semibold">Voltar</p>
          </div>

          <div
            className="w-full h-[25%] flex flex-col items-center justify-center
         border-b space-y-1"
          >
            {auth.currentUser.photoURL ? (
              <img
                src={auth.currentUser.photoURL}
                alt="Foto do Usuário"
                className="rounded-full w-24 h-24"
              />
            ) : (
              <EditedUserImg />
            )}
            <p className="text-[18px] pt-2 pb-4">{userEmail}</p>
          </div>
        </div>

        <div
          className="flex flex-col gap-y-4 my-4 overflow-y-auto overflow-x-hidden
          sm:max-h-[calc(100vh-380px)] xxs:max-h-[calc(100vh-350px)] lg:max-h-[calc(100vh-340px)]
           h-full border rounded-xl shadow-md"
        >
          {/* CRYPTO LIST */}

          {favoriteCoins.length === 0 ? (
            <div className="flex flex-grow items-center justify-center p-3 w-full">
              <p className="font-semibold uppercase tracking-wider">
                Lista Vazia!
              </p>
            </div>
          ) : (
            favoriteCoins.map((coinId) => (
              <div
                className="flex items-center justify-between p-3 w-full shadow-md rounded-lg bg-bgContrast"
                key={coinId}
              >
                <Link to={`/Crypto/${coinId}`}>
                  <span className="font-semibold uppercase">{coinId}</span>
                </Link>
                <FiTrash2
                  onClick={() => removeFromFavorites(coinId)}
                  className="cursor-pointer text-[20px]"
                />
              </div>
            ))
          )}
        </div>

        <div>
          <button
            onClick={() => auth.signOut()}
            className="w-full underline font-semibold tracking-wide p-2.5 mt-1
           flex items-center justify-center rounded-md duration-300 cursor-pointer
            bg-red-500 text-white hover:text-black hover:bg-gray-100
            hover:shadow-md"
          >
            Sair
          </button>
        </div>
      </div>
      <Alert alert={alert} setAlert={setAlert} />
    </div>
  );
};

export default UserMenu;
