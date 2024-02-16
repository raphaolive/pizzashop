import { getMonthOrdersAmount } from "@/api/get-month-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export const MonthOrdersAmountCard = () => {
  const { data: monthOrdersAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ["metrics", "month-orders-amount"],
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount ? (
          <>
            <span className="text-2xl font-semibold tracking-tight">
              {monthOrdersAmount.amount.toLocaleString()}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text text-emerald-500 dark:text-emerald-400">
                    +{monthOrdersAmount.diffFromLastMonth}%
                  </span>{" "}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text text-rose-500 dark:text-rose-400">
                    {monthOrdersAmount.diffFromLastMonth}%
                  </span>{" "}
                  em relação a ontem
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
};
