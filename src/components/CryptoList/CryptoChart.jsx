import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const CryptoChart = () => {
  const [historicData, setHistoricData] = useState([]);

  const params = useParams();
  const days = 365;
  const url = `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=brl&days=${days}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setHistoricData(response.data.prices);
      })
      .catch((error) => console.log(error));
  }, [url]);

  const chartData = {
    labels: historicData.map((crypto) => {
      let date = new Date(crypto[0]);
      return date.toLocaleDateString("pt-BR");
    }),
    datasets: [
      {
        data: historicData.map((crypto) => crypto[1]),
        label: `Price (BRL)`,
        borderColor: "#118c4f",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 1,
      }
    }
  };
  

  return (
    <div>
      <Line options={options} data={chartData}
       className="w-full mt-4"/>
    </div>
  );
};

export default CryptoChart;
