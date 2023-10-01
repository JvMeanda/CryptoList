import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

export const SearchCrypto = ({ handleSearch, resetCryptoList  }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    handleSearch(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue !== "") {
      handleSearch(inputValue);
      setInputValue("");
    } else {
      resetCryptoList();
    }
  };

  const enterKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <div
      className="w-[100%] flex items-center border shadow-sm 
    rounded mb-3"
    >
      <input
        className="flex-grow px-4 py-2 outline-none text-[18px]
       text-gray-700 placeholder-gray-400 bg-transparent"
        placeholder="Buscar Criptomoeda"
        type="text"
        name="search"
        onChange={handleInput}
        onKeyDown={enterKey}
      />
      <span className="flex items-center pr-3">
        <BsSearch
          className="text-[20px] text-gray-500 cursor-pointer"
          onClick={() => handleSearch(inputValue)}
        />
      </span>
    </div>
  );
};