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
import { options } from "./options";
import { PortData } from "../types";

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
  const { data, error, loading } = fetchData<PortData>(portUrl);

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

  console.log(origin, destination, ">>>> origin and destination");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="h-screen max-w-screen-lg pt-16 mx-auto">
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <SearchPorts
          portArrays={data}
          origin={origin}
          setOrigin={setOrigin}
          setDestination={setDestination}
          destination={destination}
        />
        <p className="py-1 font-semibold text-center">{name}</p>
      </div>
      <Line options={options} data={chartData} className="z-[-1] sticky" />
    </div>
  );
}

// next up:
// 1. double check the port data is correct
// 2. clean up the search ports components
// 3. fetch the marketvalue from the api
// 4. add the market value to the chart
// 5. add notes
// 6. set up testing
// 7. deploy with vercel
// 8. mobile view
