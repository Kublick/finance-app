import { FileSearch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import AreaVariant from "./area-variant";

type Props = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

const Chart = ({ data = [] }: Props) => {
  return (
    <Card className="border-shadow-sm border-none">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0 ">
        <CardTitle className="line-clamp-1 text-xl">Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-row items-center gap-4">
            <FileSearch className="text-muted-foregrund size-6" />
            <p className="text-sm text-muted-foreground">
              No Data for this Period
            </p>
          </div>
        ) : (
          <AreaVariant data={data} />
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;
