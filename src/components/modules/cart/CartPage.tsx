"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { Minus, Plus } from "lucide-react";
import {
    addToCart,
    CartItem,
    removeOneFromCart,
} from "../../../store/slice/cartSlice";
import Image from "next/image";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";

export default function CartPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart.items);
    const totalCart = cart.reduce((acc, item) => acc + item.quantity, 0);
    const grandTotal = cart.reduce(
        (acc, item) => acc + item.quantity * item.medicine.price,
        0,
    );

    const handleAddToCheckout = () => {
        // cart.map((item) =>
        //     dispatch(
        //         ad
        //     ),
        // );
        router.push("/checkout");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mx-3 my-10">
            <div className="col-span-1 lg:col-span-2 space-y-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-semibold">
                        My Cart
                    </h2>
                    <h4 className="">{totalCart} Items</h4>
                </div>
                <Separator />

                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100">
                            <tr className="text-left">
                                <th className="p-4">Product</th>
                                <th className="p-4 text-center">Quantity</th>
                                <th className="p-4">Price</th>
                                <th className="p-4 text-right">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cart.map((item: CartItem, index) => (
                                <tr key={index} className="">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={item.medicine.imageUrl}
                                                alt={item.medicine.name}
                                                width={60}
                                                height={60}
                                                className="rounded-md"
                                            />
                                            <div>
                                                <h2 className="font-semibold">
                                                    {item.medicine.name}
                                                </h2>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Minus
                                                onClick={() =>
                                                    dispatch(
                                                        removeOneFromCart(
                                                            item.medicine.id,
                                                        ),
                                                    )
                                                }
                                                className="cursor-pointer"
                                            />
                                            <span className="font-medium">
                                                {item.quantity}
                                            </span>
                                            <Plus
                                                onClick={() =>
                                                    dispatch(
                                                        addToCart({
                                                            medicine:
                                                                item.medicine,
                                                            quantity: 1,
                                                        }),
                                                    )
                                                }
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <p className="font-semibold">
                                            ৳{item.medicine.price}
                                        </p>
                                    </td>

                                    <td className="p-4 text-right font-semibold">
                                        ৳{item.quantity * item.medicine.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-4 lg:hidden">
                    {cart.map((item: CartItem) => (
                        <div
                            key={item.medicine.id}
                            className="border rounded-lg p-4 shadow-sm"
                        >
                            <div className="flex gap-4">
                                <Image
                                    src={item.medicine.imageUrl}
                                    alt={item.medicine.name}
                                    width={70}
                                    height={10}
                                    className="rounded-md"
                                />

                                <div className="flex-1">
                                    <h2 className="font-semibold">
                                        {item.medicine.name}
                                    </h2>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Minus
                                                onClick={() =>
                                                    dispatch(
                                                        removeOneFromCart(
                                                            item.medicine.id,
                                                        ),
                                                    )
                                                }
                                                className="cursor-pointer"
                                            />
                                            <span>{item.quantity}</span>
                                            <Plus
                                                onClick={() =>
                                                    dispatch(
                                                        addToCart({
                                                            medicine:
                                                                item.medicine,
                                                            quantity: 1,
                                                        }),
                                                    )
                                                }
                                                className="cursor-pointer"
                                            />
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm line-through text-gray-400">
                                                ৳{item.medicine.price}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-2 text-right font-semibold">
                                        Total: ৳
                                        {item.quantity * item.medicine.price}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3 p-3 border-2 border-[#E7E7E8] rounded-md h-fit">
                <h2 className="text-xl font-semibold text-left">
                    Order Summary
                </h2>
                <div className="divider"></div>
                <div className="flex items-center justify-between">
                    <p className="text-xl">Subtotal</p>
                    <p className="text-xl">৳ {grandTotal}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xl">Discount</p>
                    <p className="text-xl">৳ {0}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold">Grand Total</p>
                    <p className="text-xl font-semibold">৳ {grandTotal}</p>
                </div>
                <Button
                    onClick={handleAddToCheckout}
                    size="lg"
                    className="cursor-pointer bg-[#2B93C4] hover:bg-[#2B93C4]"
                >
                    Checkout
                </Button>
            </div>
        </div>
    );
}
