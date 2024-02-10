import { MarketRate } from "./types";
import { formatDate } from "./helpers";
import { colorBlindOptions } from "./constants";

// options specific for the time series line chart
export const options = (nullMessage: string) => {
  return {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        time: {
          unit: "day",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 6,
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14,
            weight: 600,
          },
          padding: {
            top: 8,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (Dollars)",
          font: {
            size: 14,
            weight: 600,
          },
          padding: {
            bottom: 24,
          },
        },
        ticks: {
          callback: function (value: string | number) {
            return "$" + value;
          },
        },
      },
    },
    plugins: {
      // I only show the title to indicate that there are null values
      title: {
        display: true,
        text: nullMessage,
        font: {
          size: 20,
        },
        padding: {
          bottom: 24,
        },
      },
      legend: {
        position: "right" as const,
        labels: {
          color: "black",
          padding: 12,
          font: {
            size: 14,
          },
        },
      },
    },
  };
};

// dataset for when the market rate is available
export const chartDataSet = (marketRate: MarketRate[]) => {
  return {
    labels: marketRate?.map((dataPoint: MarketRate) =>
      formatDate(dataPoint.day)
    ),
    datasets: [
      {
        label: "Market High",
        data: marketRate?.map((dataPoint: MarketRate) => dataPoint.high),
        borderColor: colorBlindOptions.blue,
        backgroundColor: colorBlindOptions.blue,
        borderWidth: 2,
        hidden: false,
        pointStyle: "circle",
        pointRadius: 3,
      },
      {
        label: "Market Mean",
        data: marketRate?.map((dataPoint: MarketRate) => dataPoint.mean),
        borderColor: colorBlindOptions.orange,
        backgroundColor: colorBlindOptions.orange,
        borderWidth: 2,
        hidden: false,
        pointStyle: "circle",
        pointRadius: 3,
      },
      {
        label: "Market Low",
        data: marketRate?.map((dataPoint: MarketRate) => dataPoint.low),
        borderColor: colorBlindOptions.green,
        backgroundColor: colorBlindOptions.green,
        borderWidth: 2,
        hidden: false,
        pointStyle: "circle",
        pointRadius: 3,
      },
    ],
  };
};
