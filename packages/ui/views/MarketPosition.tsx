import { fetchData } from "../api/fetch";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { PortData, RouteData, MarketRate } from "../utils/types";
import { Message } from "../components/Message";
import { checkNullDatasets } from "../utils/helpers";
import { keysToCheck } from "../utils/constants";
import { LineChart } from "../charts/LineChart";
import { ChartData, Point, ChartOptions } from "chart.js";

// I like to keep specific prop types on the same page, but it can be moved to a types file
type MarketPositionProps = {
  appName: string;
  portUrl: string;
  appColor: string;
  marketRateUrl: string;
  chartOptions: (chartTitleText?: string) => ChartOptions;
  chartDataSet: (
    marketRate: MarketRate[]
  ) => ChartData<"line", (number | Point | null)[], unknown>;
};

const initialRouteData = (): RouteData => ({
  origin: {
    code: "",
    name: "",
  },
  destination: {
    code: "",
    name: "",
  },
});

export const MarketPosition = (props: MarketPositionProps) => {
  const {
    appName,
    portUrl,
    appColor,
    marketRateUrl,
    chartOptions,
    chartDataSet,
  } = props;
  // state for basic page layout
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // specific states for the chart
  const [route, setRoute] = useState<RouteData>(initialRouteData());
  const [portData, setPortData] = useState<PortData[]>([]);
  // need to add a market rate type
  const [marketRate, setMarketRate] = useState<MarketRate[]>([]);
  const [chartTitleText, setChartTitleText] = useState<string>("");

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

  // checking if all of the market rates are null, if so, setting a message
  useEffect(() => {
    const originCode = route?.origin?.code?.length ?? 0;
    const destinationCode = route?.destination?.code?.length ?? 0;
    if (originCode && destinationCode) {
      // only checking to see if the mean,low,high are all null (keysToCheck)
      setChartTitleText(checkNullDatasets(marketRate, keysToCheck, route));
    }
  }, [marketRate || route]);

  if (loading) return <Message message="Loading..." />;
  if (error) return <Message message="Error, please refresh" />;
  if (!portData) return <Message message="No port data available" />;

  return (
    <div className="h-screen bg-neutral-100">
      <Header
        appColor={appColor}
        appName={appName}
        portData={portData}
        route={route}
        setRoute={setRoute}
      />
      <div className="p-4 mx-4 mt-16 bg-white border rounded-lg shadow-md md:mx-auto md:p-8 h-96 md:max-w-screen-lg md:h-chart-height border-neutral-200">
        <LineChart
          chartTitleText={chartTitleText}
          marketRate={marketRate}
          chartOptions={chartOptions}
          chartDataSet={chartDataSet}
        />
      </div>
    </div>
  );
};
