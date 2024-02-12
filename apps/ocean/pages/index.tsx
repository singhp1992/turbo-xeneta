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
        // passing down chart options and data in case we want to have different chart config files
        chartOptions={timeSeriesOptions}
        chartDataSet={timeSeriesDataSet}
      />
    </div>
  );
}
