import React from "react";
import HeroBanner from "../../assets/crypto.jpg";
import { ButtonHome } from "../../Layout/Button";
import { layout } from "../../Layout/Layout";


const Home = () => {
  
  return (
    <section
      id="Home"
      className={`flex items-center justify-between md:flex-row
       flex-col md:${layout.paddingY} mt-[70px] xl:mt-0`}
    >
      <div className={`flex-1 ${layout.flexStart} flex xl:px-0 sm:px-16 px-6`}>
        <div className="w-full max-w-[700px]">
          <div className="lg:mt-4">
            <h1 className="font-semibold ss:text-[62px] text-[52px] my-4 md:max-">
              Invista no dinheiro do Futuro!
            </h1>
            <p className="ss:text-[22px] text-[18px]">
              Compre e venda centenas de criptomoedas.
            </p>
          </div>
          <div
            className="flex items-center flex-col space-y-4 my-8
           sm:flex-row sm:space-y-0 sm:space-x-6"
          >
            <input
              type="email"
              placeholder="Escreva seu email"
              className="px-4 py-2 radius shadow-md rounded-tl-[20px] rounded-br-[20px]
               rounded-sm outline-none sm:w-auto w-80"
            />
            
              <ButtonHome text="Saiba Mais" />
            
          </div>
        </div>
      </div>

      <div className="block md:w-1/2">
        <img
          src={HeroBanner}
          alt="Banner"
          className="xl:w-[90%] xl:h-[90%] sm:w-[70%] sm:h-[70%] sm:ml-[12%]
           w-[100%] h-[100%] relative z-[5]"
        />
      </div>
    </section>
  );
};

export default Home;
