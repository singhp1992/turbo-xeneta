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
    <div className="mx-auto max-w-screen-lg mt-16 h-[450px] border border-neutral-200 rounded-lg shadow-md p-8 bg-white">
      <Line
        options={options(nullMessage)}
        data={chartDataSet(marketRate)}
        className="cursor-pointer"
      />
    </div>
  );
};
