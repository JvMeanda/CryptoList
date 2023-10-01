import React, { useState, useEffect } from "react";
import { Button } from "../../Layout/Button";

const TimerLimit = ({ timerExpired }) => {
  const [remainingTime, setRemainingTime] = useState(2.30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime === 0) {
      timerExpired();
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime, timerExpired]);

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  return (
    <div>
      {remainingTime > 0 ? (
        <p className="uppercase font-normal
        xs:text-[16px] text-[15px]">
          Atualização da página em:{" "}
          {formatNumber(Math.floor(remainingTime / 60))}:
          {formatNumber(remainingTime % 60)}
        </p>
      ) : (
        <Button
          text="Atualizar página"
          onClick={() => window.location.reload()}
        />
      )}
    </div>
  );
};

export default TimerLimit;
