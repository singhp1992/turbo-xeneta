import { Chart, baseUrl } from "ui";

export default function Air() {
  const airPortUrl = `${baseUrl}/air/airports`;
  const airMarketRateUrl = `${baseUrl}/air/rates`;

  return (
    <div>
      <Chart
        name="Market Position - Air Freight"
        portUrl={airPortUrl}
        marketRateUrl={airMarketRateUrl}
        appColor="#771DFF"
      />
    </div>
  );
}
