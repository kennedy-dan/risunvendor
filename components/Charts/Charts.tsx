import {
  Chart,
  Title,
  Legend,
  Tooltip,
  ChartData,
  ArcElement,
  BarElement,
  LinearScale,
  LineElement,
  PointElement,
  ChartOptions,
  CategoryScale,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

interface BarProps {
  datasetIdKey: string;
  options: ChartOptions<"bar">;
  data: ChartData<"bar">;
}

interface LineProps {
  datasetIdKey: string;
  options: ChartOptions<"line">;
  data: ChartData<"line">;
}

interface DoughnutProps {
  datasetIdKey: string;
  options: ChartOptions<"doughnut">;
  data: ChartData<"doughnut">;
}

interface PieProps {
  datasetIdKey: string;
  options: ChartOptions<"pie">;
  data: ChartData<"pie">;
}

export function BarChart(props: BarProps) {
  Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  return <Bar {...props} />;
}

export function LineChart(props: LineProps) {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  return <Line {...props} />;
}

export function PieChart(props: PieProps) {
  Chart.register(ArcElement, Tooltip, Legend);
  return <Pie {...props} />;
}

export function DoughnutChart(props: DoughnutProps) {
  Chart.register(ArcElement, Tooltip, Legend);
  return <Doughnut {...props} />;
}
