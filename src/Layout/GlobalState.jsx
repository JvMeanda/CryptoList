import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, dataBase } from "../auth/firebase";
import { doc, getDoc } from "firebase/firestore";

const GlobalStateContext = createContext();

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children }) {
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifique o estado de autenticação do usuário
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Verifique se a moeda está na lista de favoritos do usuário no Firebase
        const coinRef = doc(dataBase, "watchlist", user.uid);

        try {
          const coinDoc = await getDoc(coinRef);

          if (coinDoc.exists()) {
            const watchListData = coinDoc.data();
            const favoriteCoins = watchListData.crypto || [];
            setFavoriteCoins(favoriteCoins);
          }
        } catch (error) {
          console.error("Erro ao verificar a lista de favoritos:", error);
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  const addToWatchListGlobal = (coinId) => {
    if (!favoriteCoins.includes(coinId)) {
      setFavoriteCoins((prevCoins) => [...prevCoins, coinId]);
    }
  };

  const removeToWatchListGlobal = (coinId) => {
    setFavoriteCoins((prevCoins) => prevCoins.filter((id) => id !== coinId));
  };

  const isInWatchList = (coinId) => {
    return favoriteCoins.includes(coinId);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        favoriteCoins,
        isInWatchList,
        addToWatchListGlobal,
        removeToWatchListGlobal,
        user,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
