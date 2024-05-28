import {
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Area,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
} from "recharts";
import { CustomTooltip } from "./custom-tooltip";
import { format } from "date-fns";

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value);
            return isNaN(date.getTime()) ? value : format(date, "MMM dd");
          }}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="income"
          stackId="income"
          fill="#3b82f6"
          className="drop-shadow-sm"
        />
        <Bar
          dataKey="expenses"
          stackId="income"
          fill="#f43f5e"
          className="drop-shadow-sm"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarVariant;
