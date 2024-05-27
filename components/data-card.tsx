import { cva, VariantProps } from "class-variance-authority";
import { calculatePercentageChange, cn, formatPercentage } from "../lib/utils";
import { LucideProps } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import AnimatedCounter from "./animated-counter";
import { Skeleton } from "./ui/skeleton";

const boxVariants = cva("rounded-md p-3 shrink-0", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      sucess: "bg-green-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
    defaultVariants: {
      variant: "default",
    },
  },
});

const iconVariants = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500",
      sucess: "fill-green-500",
      danger: "fill-rose-500",
      warning: "fill-yellow-500",
    },
    defaultVariants: {
      variant: "default",
    },
  },
});

type BoxVariants = VariantProps<typeof boxVariants>;
type IconVariants = VariantProps<typeof iconVariants>;

interface DataCardProps extends BoxVariants, IconVariants {
  icon: React.FC<LucideProps>;
  title: string;
  value?: number;
  dateRange: string;
  percentageChange: number | undefined;
}

export const DataCard = ({
  title,
  value,
  percentageChange,
  icon: Icon,
  variant,
  dateRange,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="line-clamp-1 text-2xl">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={boxVariants({ variant })}>
          <Icon className={iconVariants({ variant })} />
        </div>
      </CardHeader>

      <CardContent>
        <h1 className="mb-2 line-clamp-1 text-2xl font-bold">
          <AnimatedCounter from={0} to={value ?? 0} />
        </h1>
        <p
          className={cn("line-clamp-1 text-sm text-muted-foreground", {
            "text-green-500": (percentageChange ?? 0) > 0,
            "text-rose-500": (percentageChange ?? 0) < 0,
          })}
        >
          {formatPercentage(percentageChange ?? 0, { addPrefix: true })} from
          last period
        </p>
      </CardContent>
    </Card>
  );
};

export const DataCardLoading = () => {
  return (
    <Card className="h-[192px] border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className=" size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-2 h-10 w-24 shrink-0" />
        <Skeleton className="h-4 w-40 shrink-0" />
      </CardContent>
    </Card>
  );
};
