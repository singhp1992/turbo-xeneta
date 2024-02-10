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
import { options, chartDataSet } from "../utils/options";
import { PortData, RouteData, MarketRate } from "../utils/types";
import { Message } from "../components/Message";
import { checkAllNull } from "../utils/helpers";
import { keysToCheck } from "../utils/constants";

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
  const [portData, setPortData] = useState<PortData[]>([]);
  // need to add a market rate type
  const [marketRate, setMarketRate] = useState<MarketRate[]>([]);
  const [nullMessage, setNullMessage] = useState<string>("");

  // initially fetching the port data
  useEffect(() => {
    fetchData({
      url: portUrl,
      setState: setPortData,
      setLoading: setLoading,
      setError: setError,
    });
  }, []);

  // fetching the market rate only if the origin and destination are set
  useEffect(() => {
    if (route?.origin?.code!.length && route?.destination?.code!.length) {
      // finalizing the url based on which ports have been selected
      let completeMarketRateUrl = `${marketRateUrl}?origin=${route?.origin?.code}&destination=${route?.destination?.code}`;

      fetchData({
        url: completeMarketRateUrl,
        setState: setMarketRate,
        setLoading: setLoading,
        setError: setError,
      });
    }
    // fetching the market rate only if the route is set // if it changes
  }, [route]);

  console.log(
    marketRate,
    ">>>> here is the marketrate",
    route,
    ">>>> here is the route"
  );

  // checking if any of the market rates are null, if sso, setting a message
  useEffect(() => {
    if (
      marketRate!.length > 0 &&
      route?.origin?.code!.length &&
      route?.destination?.code!.length
    ) {
      setNullMessage(checkAllNull(marketRate, keysToCheck, route));
    }
  }, [marketRate, route]);

  if (loading) return <Message message="Loading..." />;
  if (error) return <Message message="Error, please refresh" />;
  if (!portData) return <Message message="No port data available" />;

  return (
    <div className=" bg-neutral-100">
      <div className="h-screen mx-auto">
        <div className={`shadow-sm`} style={{ backgroundColor: appColor }}>
          <div className="flex items-center justify-between max-w-screen-xl py-6 mx-auto">
            <p className="py-1 text-xl text-center text-white">{name}</p>
            <SearchPorts
              portArrays={portData}
              route={route}
              setRoute={setRoute}
              originKey="origin"
              destinationKey="destination"
            />
          </div>
        </div>
        <div className="mx-auto max-w-screen-lg mt-16 h-[450px] border border-neutral-200 rounded-lg shadow-md p-8 bg-white">
          <Line
            options={options(nullMessage)}
            data={chartDataSet(marketRate)}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

// next up:
// 1. check to make sure types are used everywhere
// 6. set up testing
// 8. mobile view
