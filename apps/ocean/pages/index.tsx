import {
  MarketPosition,
  baseUrl,
  timeSeriesOptions,
  timeSeriesDataSet,
} from "ui";

export default function Ocean() {
  const oceanPortUrl = `${baseUrl}/ocean/ports`;
  const oceanMarketRateUrl = `${baseUrl}/ocean/rates`;

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
