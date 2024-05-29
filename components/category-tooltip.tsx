import { formatCurrency } from "@/lib/utils";

import { Separator } from "./ui/separator";
import { format } from "date-fns";

export const CategoryToolTip = ({ active, payload }: any) => {
  if (!active || !payload) {
    return null;
  }

  const name = payload[0].payload.name;
  const value = payload[0].value;

  return (
    <div className="overflow-hidden rounded-sm bg-white shadow-sm ">
      <div className="bg-muted p-2 px-3 text-sm text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="space-x-1 p-2 px-3">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-rose-500" />
            <p className="text-sm text-muted-foreground">Gastos</p>
          </div>
          <p className="text-right text-sm font-medium">
            {formatCurrency(value * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
