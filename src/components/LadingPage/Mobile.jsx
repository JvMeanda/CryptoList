import React from "react";
import mobileApp from "../../assets/mobile.png";
import Google from "../../assets/google.svg";
import Apple from "../../assets/apple.svg";
import { layout } from "../../Layout/Layout";

const Mobile = () => {
  return (
    <section
      id="APP"
      className={`flex md:flex-row flex-col items-center
       justify-center ${layout.paddingY} ${layout.boxWidth}`}
    >
      <div className={`flex flex-col md:flex-row ${layout.paddingY} w-full max-w-screen-lg`}>
        {/* Imagem para dispositivos menores */}
        <div className={`flex ${layout.flexCenter} px-6 md:hidden`}>
          <img
            src={mobileApp}
            alt="Banner"
            className="w-80 md:w-full mx-auto drop-shadow-xl"
          />
        </div>

        <div className="flex flex-1 px-6 md:pl-0 md:pr-16 md:items-center">
          <div className="max-w-[680px] lg:mt-4">
            <h2 className="font-semibold ss:text-[42px] text-[32px]">
              Baixe o app e tenha uma nova fonte de renda segura e eficiente!
            </h2>
            <p className="my-5 ss:text-[20px] text-[18px]">
              Aproveite a oportunidade de ter uma renda extra na palma da sua
              mão! Nosso aplicativo oferece uma plataforma segura e prática para
              investir em criptomoedas e potencializar seus ganhos.
            </p>
            <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
              <img src={Google} alt="Google" className="w-[128px] h-[42px] object-contain mr-5 cursor-pointer"/>
              <img src={Apple} alt="Apple" className="w-[128px] h-[42px] object-contain mr-5 cursor-pointer"/>
            </div>
          </div>
        </div>

        {/* Imagem pata dispositivos maiores */}
        <div
          className={`flex ${layout.flexCenter} px-6 md:w-1/2
           md:block hidden`}
        >
          <img
            src={mobileApp}
            alt="Banner"
            className="max-w-sm mx-auto drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Mobile;
