"use client";

import { Order, OrderStatus } from "../../../../types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../ui/select";
import { Button } from "../../../ui/button";
import { Eye, Trash } from "lucide-react";
import { toast } from "sonner";
import {
    deleteOrderById,
    updateOrderById,
} from "../../../../actions/order.action";
import { useState } from "react";
import { Dialog, DialogContent } from "../../../ui/dialog";

const orderStatusStyles: Record<OrderStatus, string> = {
    PLACED: "text-blue-600 border-blue-500",
    PROCESSING: "text-yellow-600 border-yellow-500",
    SHIPPED: "text-indigo-600 border-indigo-500",
    DELIVERED: "text-green-600 border-green-500",
    CANCELLED: "text-red-600 border-red-500",
};

export default function OrderTable({ orders }: { orders: Order[] }) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleUpdateOrder = async (
        orderId: string,
        status: { status: OrderStatus },
    ) => {
        const toastId = toast.loading("Updating Order Status...");

        try {
            const { data, error } = await updateOrderById(
                orderId as string,
                status,
            );

            if (error) {
                toast.error(error.message, { id: toastId });
                return;
            }

            toast.success(data?.message ?? "Order Updated Successfully...", {
                id: toastId,
            });
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong, please try again.", {
                id: toastId,
            });
        }
    };

    const handleView = (user: Order) => {
        setSelectedOrder(user);
        setIsOpen(true);
    };

    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Deleting Order...");

        try {
            const { data, error } = await deleteOrderById(id);
            if (error) {
                toast.error(error.message, { id: toastId });
                return;
            }
            toast.success(data?.message ?? "Order Deleted Successfully...", {
                id: toastId,
            });
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong, please try again.", {
                id: toastId,
            });
        }
    };

    return (
        <>
            {orders.length === 0 ? (
                <div className="h-24 text-center text-muted-foreground">
                    No orders found
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow className="">
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Order Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Extras</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order: Order) => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        {order.customer?.name}
                                    </TableCell>
                                    <TableCell>
                                        {order.customer?.email}
                                    </TableCell>
                                    <TableCell>
                                        {order.shippingAddress}
                                    </TableCell>
                                    <TableCell>৳{order.totalAmount}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={order.status}
                                            onValueChange={(value) => {
                                                handleUpdateOrder(order.id, {
                                                    status: value as OrderStatus,
                                                });
                                            }}
                                        >
                                            <SelectTrigger
                                                className={`w-full max-w-32 cursor-pointer font-medium ${
                                                    orderStatusStyles[
                                                        order.status
                                                    ]
                                                }`}
                                            >
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem
                                                        value={`PLACED`}
                                                        className="cursor-pointer text-blue-600 focus:text-blue-600"
                                                    >
                                                        Placed
                                                    </SelectItem>

                                                    <SelectItem
                                                        value={`PROCESSING`}
                                                        className="cursor-pointer text-yellow-600 focus:text-yellow-600"
                                                    >
                                                        Processing
                                                    </SelectItem>

                                                    <SelectItem
                                                        value={`SHIPPED`}
                                                        className="cursor-pointer text-indigo-600 focus:text-indigo-600"
                                                    >
                                                        Shipped
                                                    </SelectItem>

                                                    <SelectItem
                                                        value={`DELIVERED`}
                                                        className="cursor-pointer text-green-600 focus:text-green-600"
                                                    >
                                                        Delivered
                                                    </SelectItem>

                                                    <SelectItem
                                                        value={`CANCELLED`}
                                                        className="cursor-pointer text-red-600 focus:text-red-600"
                                                    >
                                                        Cancelled
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="flex orders-center justify-center w-fit gap-2">
                                        <Button
                                            size={`sm`}
                                            variant="outline"
                                            className="cursor-pointer group"
                                            onClick={() => handleView(order)}
                                        >
                                            <Eye className="group-hover:text-green-600" />
                                        </Button>
                                        <Button
                                            size={`sm`}
                                            variant="outline"
                                            className="cursor-pointer group"
                                            onClick={() =>
                                                handleDelete(order.id)
                                            }
                                        >
                                            <Trash className="group-hover:text-red-600" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* View Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-md w-full p-0 overflow-hidden rounded-2xl border bg-background shadow-xl outline-none">
                    {selectedOrder && (
                        <div className="flex flex-col">
                            <div className="px-6 py-4 border-b">
                                <h3 className="text-lg font-semibold">
                                    Order Details
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Order ID: {selectedOrder.id}
                                </p>
                            </div>

                            {/* Body */}
                            <div className="px-6 py-4 space-y-4">
                                {/* Status */}
                                <div className="flex items-center">
                                    <span className="text-sm text-muted-foreground">
                                        Status
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            orderStatusStyles[
                                                selectedOrder.status
                                            ]
                                        }`}
                                    >
                                        {selectedOrder.status}
                                    </span>
                                </div>

                                {/* Shipping Address */}
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                        Shipping Address
                                    </p>
                                    <p className="text-sm font-medium">
                                        {selectedOrder.shippingAddress}
                                    </p>
                                </div>

                                {/* Total Amount */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Total Amount
                                    </span>
                                    <span className="text-sm font-semibold">
                                        ৳ {selectedOrder.totalAmount.toFixed(2)}
                                    </span>
                                </div>

                                {/* Items */}
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Order Items
                                    </p>

                                    <div className="space-y-2 overflow-y-auto">
                                        {selectedOrder.items?.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between rounded-lg border p-3"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {item.medicine?.name ??
                                                            "Medicine"}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>

                                                <span className="text-sm font-semibold">
                                                    ৳{" "}
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-3 border-t text-xs text-muted-foreground">
                                Created:{" "}
                                {new Date(
                                    selectedOrder.createdAt,
                                ).toLocaleString()}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
