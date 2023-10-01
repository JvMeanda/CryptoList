import React from "react";
import { layout } from "../../Layout/Layout";
import gain from "../../assets/gain.png";
import { Button } from "../../Layout/Button";

const Gain = () => {
  return (
    <section
      id="Gain"
      className={`grid md:grid-cols-2 gap-4 md:${layout.paddingY}`}
    >
      <div className={`flex ${layout.flexStart} px-6`}>
        <div className="block md:w-1/2">
          <div
            className={`flex ${layout.flexStart} justify-between
             sm:justify-start`}
          >
            <img src={gain} alt="Banner" className="drop-shadow-xl mt-12" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 xl:px-0 sm:px-16 px-6 flex-row items-center">
        <div className="max-w-[700px] lg:mt-4">
          <h2 className="font-semibold ss:text-[42px] text-[32px]">
            Ganhe renda passiva com criptomoedas.
          </h2>
          <p className="my-5 ss:text-[20px] text-[18px]">
            Ganhe até 12% de recompensas anuais em mais de 30 ativos digitais.
            Basta manter seus ativos no aplicativo para ganhar recompensas
            automaticamente no final de cada mês, sem bloqueios e sem limites.
          </p>
          <Button text="Comece Agora!" />
        </div>
        
      </div>
    </section>
  );
};

export default Gain;
