import { Chart } from "ui";
export default function Air() {
  const airPortUrl = `https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/air/airports`;

  return (
    <div>
      <Chart name="Market Position - Air Freight" portUrl={airPortUrl} />
    </div>
  );
}
