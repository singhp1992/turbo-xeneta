import { MarketPosition, baseUrl } from "ui";

export default function Air() {
  const airPortUrl = `${baseUrl}/air/airports`;
  const airMarketRateUrl = `${baseUrl}/air/rates`;

  return (
    <div>
      <MarketPosition
        appName="Market Position - Air Freight"
        portUrl={airPortUrl}
        marketRateUrl={airMarketRateUrl}
        appColor="#771DFF"
      />
    </div>
  );
}
