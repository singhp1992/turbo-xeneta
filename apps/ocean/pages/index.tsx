import { Chart } from "ui";

export default function Ocean() {
  // NEED TO CHANGE THIS URL
  const oceanPortUrl = `https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/ocean/ports`;

  return (
    <div>
      <Chart
        name="Market Position - Ocean Freight"
        portUrl={oceanPortUrl}
        appColor="#135DFF"
      />
    </div>
  );
}
