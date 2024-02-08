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
import { fetchData } from "../api/fetch";
import { useState, useEffect } from "react";
import { SearchPorts } from "../components/SearchPorts";
import { options } from "./options";
import { PortData, RouteData } from "../types";

type ChartProps = {
  name: string;
  portUrl: string;
  appColor: string;
  marketRateUrl: string;
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
  const { name, portUrl, appColor, marketRateUrl } = props;
  // state for basic page layout
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // specific states for the chart
  // fix this any type
  const [route, setRoute] = useState<any>({});
  const [portData, setPortData] = useState<PortData[]>();
  // fix this any type
  const [marketRate, setMarketRate] = useState<any>({});

  // initially fetching the port data
  useEffect(() => {
    fetchData(portUrl, setPortData, setLoading, setError);
  }, []);

  // fetching the market rate only if the origin and destination are set
  useEffect(() => {
    if (route?.origin?.code.length > 0 && route?.destination?.code.length > 0) {
      // finalizing the url based on which ports have been selected
      let completeMarketRateUrl = `${marketRateUrl}?origin=${route?.origin?.code}&destination=${route?.destination?.code}`;

      console.log(completeMarketRateUrl, "> completeMarketRateUrl");

      fetchData(completeMarketRateUrl, setMarketRate, setLoading, setError);
    }
    // fetching the market rate only if the route is set // if it changes
  }, [route]);

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

  console.log(route, portData, marketRate, ">?>>>>>> here is the route");

  // make this more robust
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!portData) return <p>No data</p>;

  return (
    <div className="h-screen max-w-screen-lg pt-16 mx-auto">
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <SearchPorts portArrays={portData} route={route} setRoute={setRoute} />
        <p className="py-1 font-semibold text-center">{name}</p>
      </div>
      <Line options={options} data={chartData} className="z-[-1] sticky" />
    </div>
  );
}

// next up:
// 1. double check the port data is correct
// 4. add the market value to the chart
// 5. add notes
// 6. set up testing
// 7. deploy with vercel
// 8. mobile view
