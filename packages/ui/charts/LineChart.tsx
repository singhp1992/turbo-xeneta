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
  ChartData,
  Point,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MarketRate } from "../utils/types";

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
  chartTitleText: string;
  marketRate: MarketRate[];
  chartOptions: (chartTitleText?: string) => ChartOptions;
  chartDataSet: (
    marketRate: MarketRate[]
  ) => ChartData<"line", (number | Point | null)[], unknown>;
};

export const LineChart = (props: LineChartProps): JSX.Element => {
  const { chartTitleText, marketRate, chartOptions, chartDataSet } = props;
  return (
    <Line
      options={chartOptions(chartTitleText)}
      data={chartDataSet(marketRate)}
      className="cursor-pointer"
    />
  );
};
