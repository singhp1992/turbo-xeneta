import { Chart, baseUrl } from "ui";

export default function Air() {
  const airPortUrl = `${baseUrl}/air/airports`;
  const airMarketRateUrl = `${baseUrl}/air/rates?origin=SHA&destination=JFK`;

  return (
    <div>
      <Chart
        name="Market Position - Air Freight"
        portUrl={airPortUrl}
        appColor="#771DFF"
      />
    </div>
  );
}
