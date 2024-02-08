import { MarketRate } from "../types";

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
          size: 16,
        },
      },
    },
  },
};

// dataset for when the market rate is available
export const dataset = (marketRate: MarketRate[]) => {
  return {
    labels: marketRate?.map((dataPoint: any) => dataPoint.day),
    datasets: [
      {
        label: "Market High",
        data: marketRate?.map((dataPoint: any) => dataPoint.high),
        borderColor: "red",
        fill: false,
      },
      {
        label: "Market Mean",
        data: marketRate?.map((dataPoint: any) => dataPoint.mean),
        borderColor: "green",
        fill: false,
      },
      {
        label: "Market Low",
        data: marketRate?.map((dataPoint: any) => dataPoint.low),
        borderColor: "blue",
        fill: false,
      },
    ],
  };
};
