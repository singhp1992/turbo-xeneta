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

  console.log(route, portData, marketRate, name, "checking data");

  // checking if any of the market rates are null
  useEffect(() => {
    let keysToCheck = ["mean", "low", "high"];

    if (marketRate.length > 0) {
      checkAllNull(marketRate, keysToCheck);
    }
  }, [marketRate]);

  if (loading) return <Message message="Loading..." />;
  if (error) return <Message message="Error, please refresh" />;
  if (!portData) return <Message message="No port data available" />;

  return (
    <div className="bg-neutral-100">
      <div className="h-screen mx-auto">
        <div className={`shadow-sm`} style={{ backgroundColor: appColor }}>
          <div className="flex items-center justify-between max-w-screen-xl py-6 mx-auto">
            <p className="py-1 text-xl text-center text-white">{name}</p>
            <SearchPorts
              portArrays={portData}
              route={route}
              setRoute={setRoute}
            />
          </div>
        </div>
        <div className="mx-auto max-w-screen-lg mt-16 h-[450px] border border-neutral-200 rounded-lg shadow-md p-8 bg-white">
          <Line
            options={options}
            data={chartDataSet(marketRate)}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

// next up:
// 0.5. what to do with the env file
// 6. set up testing
// 7. deploy with vercel
// 8. mobile view
// fix: overlay on top when selecting ports
