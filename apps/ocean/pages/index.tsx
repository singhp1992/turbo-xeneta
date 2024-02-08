import { Chart, baseUrl } from "ui";

export default function Ocean() {
  // NEED TO CHANGE THIS URL
  const oceanPortUrl = `${baseUrl}/ocean/ports`;
  const oceanMarketRateUrl = `${baseUrl}/ocean/rates`;

  return (
    <div>
      <Chart
        name="Market Position - Ocean Freight"
        portUrl={oceanPortUrl}
        marketRateUrl={oceanMarketRateUrl}
        appColor="#135DFF"
      />
    </div>
  );
}
