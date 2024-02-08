import { MarketRate } from "../types";
import { months } from "../utils/constants";

// options specific for the time series line chart
export const options = (nullMessage: string) => {
  return {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
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
            return "$" + value; // Add a dollar sign to the y-axis labels
          },
          // stepSize: 1000,
        },
      },
    },
    plugins: {
      // I only show the title to indicate that their are null values
      title: {
        display: true,
        text: nullMessage, // Title text
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
          font: {
            size: 14,
          },
        },
      },
    },
  };
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
        borderColor: "red",
        fill: false,
        hidden: false,
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
        borderColor: "green",
        fill: false,
        hidden: false,
      },
    ],
  };
};
