"use client";

import { SelectValue } from "@radix-ui/react-select";
import { Order, OrderStatus, Review, User } from "../../../types";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
} from "../../ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Eye, MessageSquare, Star, Trash } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../ui/dialog";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { useForm } from "@tanstack/react-form";
import { Textarea } from "../../ui/textarea";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createReview } from "../../../actions/review.action";

const orderStatusStyles: Record<OrderStatus, string> = {
    PLACED: "text-blue-600 border-blue-500",
    PROCESSING: "text-yellow-600 border-yellow-500",
    SHIPPED: "text-indigo-600 border-indigo-500",
    DELIVERED: "text-green-600 border-green-500",
    CANCELLED: "text-red-600 border-red-500",
};

const reviewSchema = z.object({
    rating: z.number().min(1, "Rating must be at least 1"),
    comment: z.string().min(3, "Comment must be at least 3 characters long"),
});

export default function MyOrdersTable({
    orders,
    user,
}: {
    orders: Order[];
    user: User;
}) {
    const router = useRouter();
    const [ids, setIds] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const handleView = (user: Order) => {
        setSelectedOrder(user);
        setIsOpen(true);
    };

    const handleDelete = (id: string) => {
        console.log(id);
        toast.info("Order delete hasn't implemented yet!");
    };

    const handleAddReview = async (id: string) => {
        setIsOpen(false);
        setIsReviewOpen(true);
        setIds(id);
    };

    const form = useForm({
        defaultValues: {
            rating: 5,
            comment: "",
        },
        validators: {
            onSubmit: reviewSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Review Adding...");
            const serverData: Partial<Review> = {
                rating: value.rating,
                comment: value.comment,
                userId: user.id,
                medicineId: ids,
            };

            try {
                const { data, error } = await createReview(serverData);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }

                setIsReviewOpen(false);
                toast.success(data.message || "Review added successfully", {
                    id: toastId,
                });
                router.refresh();
                router.push("/");
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong, please try again.", {
                    id: toastId,
                });
            }
        },
    });

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
                                        <Select value={order.status} disabled>
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

                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold">
                                                        ৳{" "}
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            handleAddReview(
                                                                item.medicineId,
                                                            )
                                                        }
                                                    >
                                                        <MessageSquare className="mr-2" />{" "}
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-3 border-t flex flex-row-reverse items-center justify-between gap-2">
                                <p className="text-xs text-muted-foreground">
                                    Created:{" "}
                                    {new Date(
                                        selectedOrder.createdAt,
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                <DialogContent className="max-w-md w-full p-6 rounded-2xl border bg-background shadow-xl">
                    <DialogHeader>
                        <DialogTitle>Add Your Review</DialogTitle>
                    </DialogHeader>

                    <form
                        id="review-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <FieldGroup className="">
                            <form.Field name="rating">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    const value = field.state.value || 0;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Rating
                                            </FieldLabel>

                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`h-6 w-6 cursor-pointer transition-colors ${
                                                            star <= value
                                                                ? "text-yellow-400 fill-yellow-400"
                                                                : "text-gray-300"
                                                        } hover:text-yellow-400 hover:fill-yellow-400`}
                                                        onClick={() =>
                                                            field.handleChange(
                                                                star,
                                                            )
                                                        }
                                                    />
                                                ))}
                                            </div>

                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>
                            <form.Field name="comment">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Comment
                                            </FieldLabel>
                                            <Textarea
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Write your review..."
                                                className="border rounded-md p-2 resize-none h-24"
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>
                        </FieldGroup>

                        <DialogFooter className="pt-2">
                            <Button
                                type="submit"
                                className="w-full cursor-pointer bg-primary text-white"
                            >
                                Submit Review
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
