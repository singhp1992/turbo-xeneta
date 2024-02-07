import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeSeriesScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import fetchData from "../api/fetch";
import { useState } from "react";
import { SearchPorts } from "../components/SearchPorts";

type ChartProps = {
  name: string;
  portUrl: string;
  appColor: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeSeriesScale
);

export function Chart(props: ChartProps) {
  const { name, portUrl, appColor } = props;
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const options = {
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
      // title: {
      //   display: true,
      //   text: name,
      //   color: "black",
      //   font: {
      //     size: 16,
      //     weight: 400,
      //   },
      //   padding: {
      //     top: 12,
      //     bottom: 24,
      //   },
      // },
    },
  };

  const csv = `Time,Temperature
  2020-02-15 18:37:39,-8.25
  2020-02-15 19:07:39,-8.08
  2020-02-15 19:37:39,-8.41
  2020-02-15 20:07:39,-8.2`;

  const csvToChartData = (csv: string) => {
    const lines = csv.trim().split("\n");
    lines.shift(); // remove titles (first line)
    return lines.map((line) => {
      const [date, temperature] = line.split(",");
      return {
        x: date,
        y: temperature,
      };
    });
  };

  const chartData = {
    // here need to make it dynamic here
    datasets: [
      {
        data: csvToChartData(csv),
        label: "Market High",
        borderColor: appColor,
        fill: false,
      },
    ],
  };

  return (
    <div className="h-screen max-w-screen-lg pt-16 mx-auto">
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <SearchPorts
          // todo: need to fix this
          portArrays={fetchData(portUrl)?.data}
          origin={origin}
          setOrigin={setOrigin}
          setDestination={setDestination}
        />
        <p className="py-1 font-semibold text-center">{name}</p>
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
}

// next up:
// 1. implement and api call to get the data
// 2. pass down props from ocean and air to chart
// 3. make the chart dynamic
