import React, { useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { fetchCrypto } from "../../api/Api";
import { SearchCrypto } from "./SearchCrypto";
import { Link } from "react-router-dom";
import Loading from "../../Layout/Loading";
import Pagination from "./Pagination";

const CryptoList = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;
  const isMobile = innerWidth <= 600;

  useEffect(() => {
    fetchCrypto()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getChangeColor = (change) =>
    change > 0 ? "text-green-500" : "text-red-500";

  function formatNumber(value) {
    const parts = value.toString().split(".");
    const real = parseInt(parts[0], 10).toLocaleString("pt-BR");
    const formattedValue =
      parts.length > 1 ? `${real},${parts[1].padEnd(2, "0")}` : real;
    return formattedValue;
  }

  // LÓGICA DA PAGINAÇÃO

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data ? data.slice(startIndex, endIndex) : [];
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  // lÓGICA DO SEARCH

  const handleSearch = (inputValue) => {
    setSearch(inputValue.toLowerCase());
  };

  const filteredCoins = currentData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search) ||
      crypto.symbol.toLowerCase().includes(search)
  );

  return (
    <div className="mx-auto mt-28 font-semibold">
      <SearchCrypto handleSearch={handleSearch} />
      <table className="w-full">
        <thead className="xs:text-[16px] text-[15px]">
          <tr className="border-b">
            <th className="py-4 text-center flex items-center m-3">
              Rank de Mercado
            </th>
            <th className="py-4 text-center">Preço</th>
            <th className="py-4 text-center md:whitespace-normal">
              Mudança no Preço (24h)
            </th>
            <th className="py-4 text-center md:whitespace-normal hidden md:table-cell">
              Volume de Negociação
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>
                <div className="xxs:left-[70%] sm:left-[73%] md:left-[458px] relative">
                  <div className="py-10 flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            <>
              {filteredCoins.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-40 uppercase font-normal
                 text-[18px] tracking-wide"
                  >
                    Nenhuma criptomoeda foi encontrada na página atual.
                  </td>
                </tr>
              ) : (
                filteredCoins.map((crypto) => (
                  <tr
                    key={crypto.id}
                    className="border-b hover:bg-gray-100
                  whitespace-nowrap"
                  >
                    <td className="py-4">
                      {isMobile ? (
                        <>
                          <div className="flex items-center space-x-2 xs:text-[16px] text-[14px]">
                            <div className="pl-2 pr-1 cursor-default">
                              {crypto.market_cap_rank}
                            </div>
                            <Link to={`/Crypto/${crypto.id}`}>
                              <img
                                src={crypto.image}
                                alt={crypto.name}
                                className="bg-text rounded-[50%] shadow-md
                              w-[28px] h-[28px] mx-auto cursor-pointer"
                              />
                            </Link>
                            <Link to={`/Crypto/${crypto.id}`}>
                              <div className="uppercase cursor-pointer">
                                {crypto.symbol}
                              </div>
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center space-x-2 xs:text-[16px] text-[15px]">
                            <div className="px-4 cursor-default">
                              {crypto.market_cap_rank}
                            </div>
                            <Link to={`/Crypto/${crypto.id}`}>
                              <img
                                src={crypto.image}
                                alt={crypto.name}
                                className="bg-text rounded-[50%] shadow-md
                                w-[40px] h-[40px] mx-auto cursor-pointer"
                              />
                            </Link>
                            <Link to={`/Crypto/${crypto.id}`}>
                              <div className="cursor-pointer">
                                {crypto.name}
                              </div>
                            </Link>
                            <Link to={`/Crypto/${crypto.id}`}>
                              <div
                                className="uppercase cursor-pointer
                           text-gray-500"
                              >
                                {crypto.symbol}
                              </div>
                            </Link>
                          </div>
                        </>
                      )}
                    </td>
                    <td className="py-4 text-center xs:text-[16px] text-[15px]">
                      R$ {formatNumber(crypto.current_price)}
                    </td>
                    <td
                      className={`py-6 text-center flex items-center
                   justify-center flex-row-reverse
                      ${getChangeColor(crypto.price_change_percentage_24h)}`}
                    >
                      {crypto.price_change_percentage_24h !== null
                        ? crypto.price_change_percentage_24h.toFixed(2)
                        : ""}
                      %{" "}
                      {crypto.price_change_percentage_24h > 0 ? (
                        <MdArrowDropUp className="text-green-500 text-[28px]" />
                      ) : (
                        <MdArrowDropDown className="text-red-500 text-[28px]" />
                      )}
                    </td>
                    <td className="py-4 text-center hidden md:table-cell">
                      R$ {formatNumber(crypto.total_volume)}
                    </td>
                  </tr>
                ))
              )}
            </>
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CryptoList;
