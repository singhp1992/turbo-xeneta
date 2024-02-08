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
import { options, chartDataSet } from "./options";
import { PortData, RouteData, MarketRate } from "../types";
import { Message } from "../components/Message";
import { checkAllNull } from "../utils/sharedUtils";

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
  const [route, setRoute] = useState<RouteData>({
    origin: {
      code: "",
      name: "",
    },
    destination: {
      code: "",
      name: "",
    },
  });
  const [portData, setPortData] = useState<PortData[]>();
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

  console.log(route, portData, marketRate, ">?>>>>>> here is the route");

  const keysToCheck = ["mean", "low", "high"];

  if (marketRate.length > 0) {
    checkAllNull(marketRate, keysToCheck);
  }

  if (loading) return <Message message="Loading..." />;
  if (error) return <Message message="Error, please refresh" />;
  if (!portData) return <Message message="No port data available" />;

  return (
    <div className="h-screen max-w-screen-lg pt-16 mx-auto">
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <SearchPorts portArrays={portData} route={route} setRoute={setRoute} />
        <p className="py-1 font-semibold text-center">{name}</p>
      </div>
      <Line
        options={options}
        data={chartDataSet(marketRate)}
        className="cursor-pointer"
      />
    </div>
  );
}

// next up:
// 1. check multiple sources for the data
// 2. make sure it works for both air and ocean
// 3. make the chart look a little neater
// 4. make the colors more consistent
// 0.5. what to do with the env file
// 6. set up testing
// 7. deploy with vercel
// 8. mobile view
// fix: overlay on top when selecting ports
