import React, { useState, useEffect } from "react";
import { Button } from "../../Layout/Button";
import { Link } from "react-router-dom";
import { layout } from "../../Layout/Layout";
import Loading from "../../Layout/Loading";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import TimerLimit from "../CryptoList/TimerLimit";
import { fetchExploreCoin } from "../../api/Api";

const Explore = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    fetchExploreCoin()
      .then((response) => {
        setData(response);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const cryptoID = [
    "bitcoin",
    "ethereum",
    "cardano",
    "solana",
    "binancecoin",
    "polkadot",
  ];

  const getChangeColor = (change) => {
    return change > 0 ? "text-green-600" : "text-red-600";
  };

  function formatNumber(value) {
    const formattedValue = new Intl.NumberFormat("pt-BR").format(value);
    return formattedValue;
  }

  const handleTimerExpired = () => {
    setTimerExpired(true);
  };

  return (
    <section
      id="Explore"
      className={`flex md:flex-row flex-col ${layout.paddingY}
       ${layout.boxWidth}`}
    >
      <div className="flex flex-1 xl:px-0 sm:px-16 px-6 flex-row items-center">
        <div>
          <h2 className="font-semibold ss:text-[42px] text-[32px]">
            Explore as principais <br /> criptomoedas do mercado.
          </h2>
          <p className="my-5 ss:text-[20px] text-[18px]">
            Explore todas as Criptomoedas disponíveis, <br />
            com cotação em tempo real!
          </p>
          <Link to="/Crypto">
            <Button text="Ver mais Criptomoedas" />
          </Link>
        </div>
      </div>

      <div
        className={`flex-1 ${layout.flexStart} flex xl:px-0 sm:px-16
         px-6 flex-row-reverse`}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            {!data ? (
              <>
              <div className="flex flex-col justify-center items-center">
                <p
                  className="uppercase font-normal
                  xs:text-[16px] text-[15px] py-12"
                >
                  O limite de solicitações da API foi atingido!
                </p>
                <TimerLimit timerExpired={handleTimerExpired} />
              </div>
              </>
            ) : (
              <div className="grid grid-cols-3 sm:gap-5 gap-1 mt-8">
                {data !== null &&
                  data
                    .filter((crypto) => cryptoID.includes(crypto.id))
                    .map((crypto) => (
                      <Link to={`/Crypto/${crypto.id}`} key={crypto.id}>
                        <div
                          key={crypto.id}
                          className="flex flex-col items-center border-2 p-6 
                      rounded-md shadow-md hover:bg-gray-100"
                        >
                          <img
                            src={crypto.image}
                            alt={crypto.name}
                            className="md:w-16 md:h-16 rounded-full ss:w-12 ss:h-12"
                          />
                          <p className="mt-2 text-center font-semibold">
                            {crypto.name}
                          </p>
                          <p
                            className="my-2 text-center font-poppins
                      sm:text-[18px] text-[12px]"
                          >
                            <span className="mr-1">R$</span>
                            {formatNumber(crypto.current_price)}
                          </p>
                          <span
                            className={`flex flex-row-reverse items-center 
                      text-[18px] sm:text-[20px]
                      ${getChangeColor(crypto.price_change_percentage_24h)}`}
                          >
                            {crypto.price_change_percentage_24h !== null
                              ? crypto.price_change_percentage_24h.toFixed(2)
                              : ""}
                            %{" "}
                            {crypto.price_change_percentage_24h > 0 ? (
                              <MdArrowDropUp className="text-green-600 text-[28px]" />
                            ) : (
                              <MdArrowDropDown className="text-red-600 text-[28px]" />
                            )}
                          </span>
                        </div>
                      </Link>
                    ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Explore;
