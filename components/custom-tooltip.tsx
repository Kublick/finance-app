import { formatCurrency } from "@/lib/utils";

import { Separator } from "./ui/separator";
import { format } from "date-fns";

export const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload) {
    return null;
  }

  const date = payload[0].payload.date;
  const income = payload[0].value;

  const expenses = payload[1].value;

  return (
    <div className="overflow-hidden rounded-sm bg-white shadow-sm ">
      <div className="bg-muted p-2 px-3 text-sm text-muted-foreground">
        {format(date, "MMM dd, yyy")}
      </div>
      <Separator />
      <div className="space-x-1 p-2 px-3">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-blue-500" />
            <p className="text-sm text-muted-foreground">Ingreso</p>
          </div>
          <p className="text-right text-sm font-medium">
            {formatCurrency(income)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-rose-500" />
            <p className="text-sm text-muted-foreground">Gasto</p>
          </div>
          <p className="text-right text-sm font-medium">
            {formatCurrency(expenses * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
