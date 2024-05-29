"use client";
import { formatDateRange } from "@/lib/utils";
import qs from "query-string";
import { format, subDays } from "date-fns";
import { ChevronDown } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange, isDateRange } from "react-day-picker";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverClose, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";

const DateFilter = () => {
  const router = useRouter();
  const pathName = usePathname();

  const param = useSearchParams();
  const accountId = param.get("accountId");
  const from = param.get("from") || "";
  const to = param.get("to") || "";

  const defaulTo = new Date();
  const defaultFrom = subDays(defaulTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaulTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: dateRange?.from
        ? format(dateRange.from || defaultFrom, "yyyy-MM-dd")
        : "",
      to: dateRange?.to ? format(dateRange.to || defaulTo, "yyyy-MM-dd") : "",
      accountId,
    };

    const url = qs.stringifyUrl(
      {
        url: pathName,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size="sm"
          variant="outline"
          className="h-9 w-full rounded-md border-none bg-white/20 px-3 font-normal text-white outline-none transition hover:bg-white/40 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto"
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 lg:w-auto" align="start">
        <Calendar
          disabled={false}
          initialFocus
          mode="range"
          selected={date}
          defaultMonth={date?.from}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="flex w-full items-center gap-x-2 p-4">
          <PopoverClose asChild>
            <Button
              onClick={onReset}
              disabled={!date?.from || !date?.to}
              className="w-full"
              variant={"outline"}
            >
              Reiniciar
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              onClick={() => {
                pushToUrl(date);
              }}
              disabled={!date?.from || !date?.to}
              className="w-full"
            >
              Aplicar
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
