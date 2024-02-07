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
} from "chart.js";
import { Line } from "react-chartjs-2";
import fetchData from "../api/fetch";
import { useState } from "react";
import { SearchPorts } from "../components/SearchPorts";

type ChartProps = {
  name: string;
  portUrl: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function Chart(props: ChartProps) {
  const { name, portUrl } = props;
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const options = {
    responsive: true,
    plugins: {
      scales: {
        x: {
          type: "timeseries",
        },
      },
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: props.name,
      },
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
        label: "Temperature",
        borderColor: "#3e95cd",
        fill: false,
      },
    ],
  };

  const destinationArray = ["Kale", "Onions", "Broccoli", "Peas"];

  return (
    <div className="h-screen max-w-screen-lg pt-16 mx-auto">
      <SearchPorts
        portArrays={fetchData(portUrl)?.data}
        origin={origin}
        setOrigin={setOrigin}
        setDestination={setDestination}
      />
      <Line options={options} data={chartData} />
    </div>
  );
}

// next up:
// 1. implement and api call to get the data
// 2. pass down props from ocean and air to chart
// 3. make the chart dynamic
