"use server";

import { updateTag } from "next/cache";
import { orderService } from "../services/order.service";
import { CreateOrder, OrderStatus } from "../types";

export const createOrder = async(data: CreateOrder) => {
	return await orderService.createOrder(data);
}

export const updateOrderById = async(id: string, data: { status: OrderStatus }) => {
	updateTag("orders");
	return await orderService.updateOrderById(id, data);
}

export const deleteOrderById = async(id: string) => {
	updateTag("orders");
	return await orderService.deleteOrderById(id);
}