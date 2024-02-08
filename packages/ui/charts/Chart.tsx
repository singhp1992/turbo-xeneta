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
import { Message } from "../components/Message";

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
  const [marketRate, setMarketRate] = useState<any>([]);

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

  const chartData = {
    // here need to make it dynamic here
    labels: marketRate?.map((dataPoint: any) => dataPoint.day),
    datasets: [
      {
        label: "High",
        data: marketRate?.map((dataPoint: any) => dataPoint.high),
        borderColor: "red",
        fill: false,
      },
      {
        label: "Low",
        data: marketRate?.map((dataPoint: any) => dataPoint.low),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Mean",
        data: marketRate?.map((dataPoint: any) => dataPoint.mean),
        borderColor: "green",
        fill: false,
      },
    ],
  };

  console.log(route, portData, marketRate, ">?>>>>>> here is the route");

  if (loading) return <Message message="Loading..." />;
  if (error) return <Message message="Error, please refresh" />;
  if (!portData) return <Message message="No port data available" />;

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
// 1. check multiple sources for the data
// 2. make sure it works for both air and ocean
// 3. make the chart look a little neater
// 4. make the colors more consistent
// 4.5. on click show the market value labels
// 0. add tool tips
// 0.5. what to do with the env file
// 1. FIX: after selecting the ports, you cant type in a new port option
// 5. add notes
// 6. set up testing
// 7. deploy with vercel
// 8. mobile view
