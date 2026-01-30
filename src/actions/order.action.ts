"use server";

import { orderService } from "../services/order.service";
import { CreateOrder } from "../types";

export const createOrder = async(data: CreateOrder) => {
	return await orderService.createOrder(data);
}