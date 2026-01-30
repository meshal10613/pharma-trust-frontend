"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Link from "next/link";
import { ArrowLeft, Check, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { Separator } from "../../ui/separator";
import {
    addToCheckout,
    CheckoutItem,
    clearCheckout,
    removeFromCheckout,
    removeOneFromCheckout,
} from "../../../store/slice/checkoutSlice";
import { Button } from "../../ui/button";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { User } from "../../../types";
import { createOrder } from "../../../actions/order.action";
import { useRouter } from "next/navigation";
import { clearCart } from "../../../store/slice/cartSlice";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    mobile: z.string().min(10, "Mobile number is required"),
    shippingAddress: z.string().min(10, "Shipping address is required"),
});

export default function CheckoutPage({ user }: { user: User }) {
	const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const checkout = useSelector((state: RootState) => state.checkout.items);
    const grandTotal = checkout.reduce(
        (acc, item) => acc + item.quantity * item.medicine.price,
        0,
    );

    const form = useForm({
        defaultValues: {
            name: "",
            mobile: "",
            shippingAddress: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Placing your order...");
            if (checkout.length === 0) {
                toast.error("No items to place an order.", { id: toastId });
                return;
            }
            try {
                const orderItems = checkout.map((item) => ({
                    medicineId: item.medicine.id,
                    quantity: item.quantity,
                    price: item.medicine.price,
                }));
                const serverData = {
                    customerId: user.id,
                    shippingAddress: value.shippingAddress,
                    items: orderItems,
                };
                const { data, error } = await createOrder(serverData);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }
                toast.success(data.message || "Order placed successfully!", {
                    id: toastId,
                });
				form.reset();
				dispatch(clearCart());
				dispatch(clearCheckout());
                router.push("/");
                router.refresh();
            } catch (error) {
                console.error(error);
                toast.error("Failed to place order", {
                    id: toastId,
                });
            }
        },
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="col-span-1 lg:col-span-2 mx-5 space-y-5">
                <h2 className="text-xl lg:text-2xl font-semibold">
                    Delivery Address
                </h2>
                <Separator />
                <form
                    id="checkout-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup className="">
                        <div className="grid grid-cols-2 gap-5">
                            <form.Field name="name">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Name
                                            </FieldLabel>

                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Enter your name"
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
                            <form.Field name="mobile">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Mobile Number
                                            </FieldLabel>

                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Enter your mobile number"
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
                        </div>
                        <form.Field name="shippingAddress">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Shipping Address
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
                                            placeholder="Enter your full shipping address"
                                            rows={4}
                                        />

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                    </FieldGroup>
                </form>
            </div>
            <div className="col-span-1 mx-5">
                <h2 className="text-xl lg:text-2xl font-semibold">
                    Order Items ({checkout.length})
                </h2>
                <Separator className="my-5" />
                {checkout.map((item: CheckoutItem, index) => (
                    <div
                        key={index}
                        className="border p-2 rounded-md mb-5 flex items-center gap-3 relative dark:bg-[#171717]"
                    >
                        <Image
                            src={item.medicine.imageUrl}
                            alt={item.medicine.name}
                            width={50}
                            height={50}
                        />
                        <div className="flex flex-col">
                            <h2 className="text-base font-semibold">
                                {item.medicine.name}
                            </h2>
                            <div className="flex items-center gap-2">
                                <span
                                    onClick={() =>
                                        dispatch(
                                            removeOneFromCheckout(
                                                item.medicine.id,
                                            ),
                                        )
                                    }
                                    className="p-1 w-5 h-5 flex items-center justify-center cursor-pointer bg-gray-300"
                                >
                                    <Minus />
                                </span>
                                <span>{item.quantity}</span>
                                <span
                                    onClick={() =>
                                        dispatch(
                                            addToCheckout({
                                                medicine: item.medicine,
                                                quantity: 1,
                                            }),
                                        )
                                    }
                                    className="p-1 w-5 h-5 flex items-center justify-center cursor-pointer bg-gray-300"
                                >
                                    <Plus />
                                </span>
                                <span className="font-bold">
                                    ৳ {item.medicine.price * item.quantity}
                                </span>
                            </div>
                            <span
                                onClick={() =>
                                    dispatch(
                                        removeFromCheckout(item.medicine.id),
                                    )
                                }
                                className="w-8 h-8 hover:bg-gray-300 hover:text-red-500 rounded-full flex items-center justify-center cursor-pointer absolute right-2 top-1/3"
                            >
                                <X />
                            </span>
                        </div>
                    </div>
                ))}
                <Separator className="my-5" />
                <div className="flex items-center justify-between mb-2 font-semibold">
                    <span>Subtotal:</span>
                    <span>৳ {grandTotal}</span>
                </div>
                <div className="flex items-center justify-between mb-2 font-semibold">
                    <span>Discount:</span>
                    <span>৳ 0</span>
                </div>
                <div className="flex items-center justify-between mb-2 font-semibold">
                    <span>Delivery Charge:</span>
                    <span>৳ 0</span>
                </div>
                <div className="divider"></div>
                <div className="flex items-center justify-between mb-2 font-semibold">
                    <span>Grand Total:</span>
                    <span>৳ {grandTotal}</span>
                </div>
                <Separator className="my-5" />
                <div className="flex items-center justify-between">
                    <Link href="/cart" className="flex items-center gap-2">
                        <ArrowLeft /> Back to Cart
                    </Link>
                    <Button
                        form="checkout-form"
                        size="lg"
                        className={`w-40 bg-[#2B93C4] hover:bg-[#2B93C4] dark:text-white cursor-pointer`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Check size={20} />
                            Confirm Order
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
