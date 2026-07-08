import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Metric = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  hint: string;
};

const METRICS: Metric[] = [
  {
    label: "Total Revenue",
    value: "$1,250.00",
    delta: "+12.5%",
    trend: "up",
    hint: "Trending up this month",
  },
  {
    label: "New Customers",
    value: "1,234",
    delta: "-20%",
    trend: "down",
    hint: "Acquisition needs attention",
  },
  {
    label: "Active Accounts",
    value: "45,678",
    delta: "+12.5%",
    trend: "up",
    hint: "Strong user retention",
  },
  {
    label: "Growth Rate",
    value: "4.5%",
    delta: "+4.5%",
    trend: "up",
    hint: "Meets growth projections",
  },
];

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {METRICS.map((m) => {
        const TrendIcon = m.trend === "up" ? TrendingUpIcon : TrendingDownIcon;
        return (
          <Card key={m.label}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {m.label}
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "gap-1 rounded-md px-1.5 py-0 text-xs font-medium",
                    m.trend === "up"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive"
                  )}
                >
                  <TrendIcon className="size-3" />
                  {m.delta}
                </Badge>
              </div>
              <div className="mt-2 text-2xl font-semibold tabular-nums tracking-tight">
                {m.value}
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                {m.hint}
                <TrendIcon className="size-3" />
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
