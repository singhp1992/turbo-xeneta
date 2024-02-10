import { fetchData } from "../api/fetch";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { PortData, RouteData, MarketRate } from "../utils/types";
import { Message } from "../components/Message";
import { checkAllNull } from "../utils/helpers";
import { keysToCheck } from "../utils/constants";
import { LineChart } from "../charts/LineChart";

type MarketPositionProps = {
  appName: string;
  portUrl: string;
  appColor: string;
  marketRateUrl: string;
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
  const { appName, portUrl, appColor, marketRateUrl } = props;
  // state for basic page layout
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // specific states for the chart
  const [route, setRoute] = useState<RouteData>(initialRouteData());
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

  // checking if any of the market rates are null, if so, setting a message
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
    <div className="h-screen bg-neutral-100">
      <Header
        appColor={appColor}
        appName={appName}
        portData={portData}
        route={route}
        setRoute={setRoute}
      />
      <LineChart nullMessage={nullMessage} marketRate={marketRate} />
    </div>
  );
};

// next up:
// 6. set up testing
// 8. mobile view
