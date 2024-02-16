import { api } from "@/lib/axios";

export interface AppoveOrderParams {
  orderId: string;
}

export async function appoveOrder({ orderId }: AppoveOrderParams) {
  await api.patch(`/orders/${orderId}/approve`);
}
