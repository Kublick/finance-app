import { type ClassValue, clsx } from "clsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";
import { es } from "date-fns/locale/es";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountToMiliUnits(amount: number) {
  return Math.round(amount * 1000);
}

export function convertAmountFromMiliUnits(amount: number) {
  return Math.round(amount / 1000);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}

export function fillMissingDays(
  activeDays: {
    date: Date;
    income: number;
    expenses: number;
  }[],
  startDate: Date,
  endDate: Date,
) {
  if (activeDays.length === 0) {
    return [];
  }
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const transactionsByDate = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));
    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });
  return transactionsByDate;
}

type Period = {
  to: string | Date | undefined;
  from: string | Date | undefined;
};

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd", { locale: es })} - ${format(defaultTo, "LLL dd y", { locale: es })}`;
  }

  if (period.to) {
    return `${format(new Date(period.from), "LLL dd", { locale: es })} - ${format(new Date(period.to), "LLL dd y", { locale: es })}`;
  }

  if (period.from) {
    return `${format(new Date(period.from), "LLL dd, y", { locale: es })}`;
  }
}

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false },
) {
  const result = new Intl.NumberFormat("es-MX", {
    style: "percent",
  }).format(value / 100);

  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }

  return result;
}
