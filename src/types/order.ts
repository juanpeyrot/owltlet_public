import { IOrder } from "@/backend/db/models/Order";

export type BaseOrder = Pick<IOrder, "productIds" | "isPaid" | "paidAt" | "total" | "tax" | "orderId"> & { userEmail: string };
