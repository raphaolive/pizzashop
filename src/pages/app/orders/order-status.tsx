export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProp {
  status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  processing: "Em preparo",
  delivering: "Em entrega",
  delivered: "Entregue",
};

export const OrderStatus = ({ status }: OrderStatusProp) => {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && (
        <span className="h-3 w-3 bg-slate-400 rounded-full" />
      )}

      {status === "canceled" && (
        <span className="h-2 w-2 bg-rose-500 rounded-full" />
      )}

      {status === "delivered" && (
        <span className="h-2 w-2 bg-emerald-500 rounded-full" />
      )}

      {["processing", "delivering"].includes(status) && (
        <span className="h-2 w-2 bg-amber-400 rounded-full" />
      )}

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
};
