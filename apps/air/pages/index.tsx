import {
  MarketPosition,
  timeSeriesOptions,
  timeSeriesDataSet,
  airPortUrl,
  airMarketRateUrl,
} from "ui";

export default function Air() {
  return (
    <div>
      <MarketPosition
        appName="Market Position - Air Freight"
        portUrl={airPortUrl}
        marketRateUrl={airMarketRateUrl}
        appColor="#771DFF"
        chartOptions={timeSeriesOptions}
        chartDataSet={timeSeriesDataSet}
      />
    </div>
  );
}
