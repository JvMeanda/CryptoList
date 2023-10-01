import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { layout } from "../../Layout/Layout";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import CryptoChart from "./CryptoChart";
import Loading from "../../Layout/Loading";
import { ButtonHome } from "../../Layout/Button";
import { dataBase } from "../../auth/firebase";
import axios from "axios";
import Alert from "../../Layout/Alert";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useGlobalState } from "../../Layout/GlobalState";

const CryptoID = () => {
  const [crypto, setCrypto] = useState({});
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const { addToWatchListGlobal, removeToWatchListGlobal, isInWatchList, user } =
    useGlobalState();
  const url = `https://api.coingecko.com/api/v3/coins/${params.id}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCrypto(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  const addToWatchList = async () => {
    const coinRef = doc(dataBase, "watchlist", user.uid);

    try {
      const coinDoc = await getDoc(coinRef);

      if (coinDoc.exists()) {
        const updatedWatchList = coinDoc.data().crypto || [];

        if (!updatedWatchList.includes(crypto.id)) {
          updatedWatchList.push(crypto.id);

          await setDoc(coinRef, {
            crypto: updatedWatchList,
          });

          setAlert({
            type: "success",
            message: `${crypto.name} adicionado aos favoritos!`,
          });

          addToWatchListGlobal(crypto.id); // Chame a função global
        } else {
          setAlert({
            type: "error",
            message: `${crypto.name} já foi adicionado aos favoritos!`,
          });
        }
      } else {
        await setDoc(coinRef, {
          crypto: [crypto.id],
        });

        setAlert({
          type: "success",
          message: `${crypto.name} adicionado aos favoritos!`,
        });

        addToWatchListGlobal(crypto.id); // Chame a função global
      }
    } catch (error) {
      setAlert({ type: "error", message: "Erro ao favoritar moeda." });
    }
  };

  const removeToWatchList = async () => {
    const coinRef = doc(dataBase, "watchlist", user.uid);

    try {
      const coinDoc = await getDoc(coinRef);

      if (coinDoc.exists()) {
        const watchListData = coinDoc.data();
        const updatedWatchList = (watchListData.crypto || []).filter(
          (coinId) => coinId !== crypto.id
        );

        await setDoc(coinRef, {
          crypto: updatedWatchList,
        });

        setAlert({
          type: "success",
          message: `${crypto.name} removido dos favoritos!`,
        });

        removeToWatchListGlobal(crypto.id); // Chame a função global
      } else {
        setAlert({
          type: "error",
          message: `${crypto.name} não está na lista de favoritos!`,
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Erro ao remover moeda dos favoritos.",
      });
    }
  };

  function formatNumber(value) {
    const parts = value.toString().split(".");
    const real = parseInt(parts[0], 10).toLocaleString("pt-BR");
    const formattedValue =
      parts.length > 1 ? `${real},${parts[1].padEnd(2, "0")}` : real;
    return formattedValue;
  }

  function formatBigNumbers(value) {
    const millionNumber = ["", "M", "B", "T", "QUA"];

    const absValue = Math.abs(value);

    if (value === null) {
      return <span className="ml-1 text-[22px]">&infin;</span>;
    } else if (absValue >= 1e15) {
      return (value / 1e15).toFixed(2) + millionNumber[4]; // Quadrilhão
    } else if (absValue >= 1e12) {
      return (value / 1e12).toFixed(2) + millionNumber[3]; // Trilhão
    } else if (absValue >= 1e9) {
      return (value / 1e9).toFixed(2) + millionNumber[2]; // Bilhão
    } else if (absValue >= 1e6) {
      return (value / 1e6).toFixed(2) + millionNumber[1]; // Milhão
    } else if (absValue >= 1e3) {
      return (value / 1e3).toFixed(2) + millionNumber[0]; // Mil
    }
  }

  const timeIntervals = [
    { label: "1H", dataKey: "price_change_percentage_1h_in_currency" },
    { label: "24H", dataKey: "price_change_percentage_24h_in_currency" },
    { label: "7D", dataKey: "price_change_percentage_7d_in_currency" },
    { label: "30D", dataKey: "price_change_percentage_30d_in_currency" },
    { label: "1Y", dataKey: "price_change_percentage_1y_in_currency" },
  ];

  const getChangeColor = (change) => {
    if (crypto.market_data && crypto.market_data.current_price) {
      return change > 0 ? "text-green-500" : "text-red-500";
    }
    return "";
  };

  return (
    <section
      className={`${layout.paddingY} ${layout.boxWidth} mt-12 md:mt-6 lg:mt-20 
      flex flex-col md:flex-row`}
    >
      {/* INFORMAÇÕES DA MOEDA */}

      {loading ? (
        <div className="xxs:left-0 sm:left-0 md:left-[580px] relative">
          <div className="py-20 flex items-center justify-center h-full w-full">
            <Loading />
          </div>
        </div>
      ) : (
        <>
          <div
            key={crypto.id}
            className="w-full md:w-[450px] h-auto border rounded-xl shadow-md p-6
         bg-bgContrast md:mr-8 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center flex-col">
                {crypto.image ? (
                  <img
                    src={crypto.image.large}
                    alt={crypto.symbol}
                    className="w-[110px] h-[110px] rounded-full mb-3"
                  />
                ) : null}
                <h1 className="uppercase text-[24px] tracking-wider font-semibold">
                  {crypto.id}
                </h1>
                <p className="text-[24px] font-semibold">
                  R$ {formatNumber(crypto.market_data?.current_price?.brl)}
                </p>
              </div>
              {crypto.description.en ? (
                <p>{crypto.description.en.split(".")[0]}.</p>
              ) : (
                <p className="text-center text-[18px]">
                  Descrição não disponível.
                </p>
              )}
              <div className="bg-primary px-3 py-1 max-w-max rounded-md shadow-md text-white">
                <p className="text-[18px] tracking-wide">
                  Rank {crypto.market_cap_rank}
                </p>
              </div>
              <p className="text-[20px] font-semibold flex">
                Moedas circulantes:{" "}
                {formatBigNumbers(crypto.market_data.total_supply)}
              </p>
              <p className="text-[20px] font-semibold flex">
                Total de Moedas:{" "}
                {formatBigNumbers(crypto.market_data.max_supply)}
              </p>
            </div>
            {user && (
              <div className="text-center mt-6">
                <ButtonHome
                  text={
                    isInWatchList(crypto.id)
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                  onClick={() => {
                    if (isInWatchList(crypto.id)) {
                      removeToWatchList(crypto.id);
                    } else {
                      addToWatchList(crypto.id);
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* TABELA DE VARIAÇÃO DA MOEDA */}

          <div className="w-full mx-auto flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-center xs:justify-center">
                  <tr className="text-center">
                    {timeIntervals.map((interval) => (
                      <th
                        key={interval.label}
                        className="bg-primary text-white border border-black px-4 py-2 font-semibold"
                      >
                        {interval.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    {timeIntervals.map((interval) => (
                      <td
                        key={interval.label}
                        className={`${
                          crypto.market_data &&
                          crypto.market_data[interval.dataKey]?.brl !==
                            undefined
                            ? getChangeColor(
                                crypto.market_data[interval.dataKey]?.brl
                              )
                            : ""
                        } text-[18px] border border-black px-4 py-2`}
                      >
                        <div className="flex items-center justify-center mr-5">
                          {crypto.market_data &&
                          crypto.market_data[interval.dataKey]?.brl !==
                            undefined ? (
                            <>
                              {crypto.market_data[
                                interval.dataKey
                              ]?.brl.toFixed(2)}
                              %{" "}
                              {crypto.market_data[interval.dataKey]?.brl > 0 ? (
                                <MdArrowDropUp className="text-green-500 text-[36px]" />
                              ) : (
                                <MdArrowDropDown className="text-red-500 text-[36px]" />
                              )}
                            </>
                          ) : (
                            <div className="flex items-center justify-center ml-5">
                              <p>Sem dados</p>
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <CryptoChart />
          </div>
        </>
      )}
      <Alert alert={alert} setAlert={setAlert} />
    </section>
  );
};

export default CryptoID;
