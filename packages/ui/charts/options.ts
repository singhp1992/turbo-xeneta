import { MarketRate } from "../types";
import { months } from "../constants";

// options specific for the time series line chart
export const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        color: "black",
        font: {
          size: 14,
        },
      },
    },
  },
};

// formating the date so it's slightly more user friendly
const formatDate = (inputDate: string): string => {
  const [year, month, day] = inputDate.split("-");
  const monthIndex: number = parseInt(month, 10) - 1;

  return `${months[monthIndex]} ${parseInt(day, 10)} '${year.slice(-2)}`;
};

// dataset for when the market rate is available
export const chartDataSet = (marketRate: MarketRate[]) => {
  return {
    labels: marketRate?.map((dataPoint: any) => formatDate(dataPoint.day)),
    datasets: [
      {
        label: "Market High",
        data: marketRate?.map((dataPoint: any) => dataPoint.high),
        borderColor: "green",
        fill: false,
        hidden: true,
      },
      {
        label: "Market Mean",
        data: marketRate?.map((dataPoint: any) => dataPoint.mean),
        borderColor: "blue",
        fill: false,
        hidden: false,
      },
      {
        label: "Market Low",
        data: marketRate?.map((dataPoint: any) => dataPoint.low),
        borderColor: "purple",
        fill: false,
        hidden: true,
      },
    ],
  };
};
