import {
  MarketPosition,
  timeSeriesOptions,
  timeSeriesDataSet,
  oceanPortUrl,
  oceanMarketRateUrl,
} from "ui";

export default function Ocean() {
  return (
    <div>
      <MarketPosition
        appName="Market Position - Ocean Freight"
        portUrl={oceanPortUrl}
        marketRateUrl={oceanMarketRateUrl}
        appColor="#135DFF"
        chartOptions={timeSeriesOptions}
        chartDataSet={timeSeriesDataSet}
      />
    </div>
  );
}
