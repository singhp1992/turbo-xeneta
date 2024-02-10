import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeSeriesScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { options, chartDataSet } from "../utils/chartOptions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeSeriesScale
);

type LineChartProps = {
  nullMessage: any;
  marketRate: any;
};

export const LineChart = (props: LineChartProps): JSX.Element => {
  const { nullMessage, marketRate } = props;
  return (
    <div className="max-w-screen-lg p-8 mx-auto mt-16 bg-white border rounded-lg shadow-md h-chart-height border-neutral-200">
      <Line
        options={options(nullMessage)}
        data={chartDataSet(marketRate)}
        className="cursor-pointer"
      />
    </div>
  );
};
