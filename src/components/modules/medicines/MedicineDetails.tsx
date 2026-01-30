"use client";

import { useState } from "react";
import { Medicine } from "../../../types";
import Image from "next/image";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/slice/cartSlice";
import { addToCheckout } from "../../../store/slice/checkoutSlice";
import { useRouter } from "next/navigation";

export default function MedicinesDetails({ medicine }: { medicine: Medicine }) {
    const router = useRouter();
	const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const increase = () => {
        if (quantity < medicine.stock) setQuantity(quantity + 1);
    };

    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = (medicine: Medicine) => {
        const data = {
            medicine,
            quantity,
        };
        dispatch(addToCart(data));
    };

    const handleBuyNow = (medicine: Medicine) => {
        const data = {
            medicine,
            quantity,
        };
        dispatch(addToCheckout(data));
        router.push("/checkout");
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <Card className="rounded-2xl shadow-lg">
                <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="flex justify-center items-center">
                        <Image
                            src={medicine.imageUrl}
                            alt={medicine.name}
                            width={400}
                            height={400}
                            className="rounded-xl object-contain bg-muted p-6"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Badge
                            className="w-fit text-[#2B93C4] bg-transparent"
                            variant={`outline`}
                        >
                            {medicine.category?.name}
                        </Badge>
                        <h1 className="text-3xl font-bold">{medicine.name}</h1>
                        <p className="text-muted-foreground">
                            {medicine.description}
                        </p>
                        <Separator />
                        <div className="space-y-2">
                            <p>
                                <span className="font-medium">
                                    Manufacturer:
                                </span>{" "}
                                {medicine.manufacturer}
                            </p>
                            <p>
                                <span className="font-medium">Seller:</span>{" "}
                                {medicine.seller?.name}
                            </p>
                            <p>
                                <span className="font-medium">Stock:</span>{" "}
                                {medicine.stock > 0 ? (
                                    <span className="text-green-600">
                                        {medicine.stock} available
                                    </span>
                                ) : (
                                    <span className="text-red-500">
                                        Out of stock
                                    </span>
                                )}
                            </p>
                        </div>
                        <Separator />
                        <div className="text-3xl font-bold text-primary">
                            ৳ {medicine.price}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-lg">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={decrease}
                                    className="cursor-pointer"
                                >
                                    <Minus size={18} />
                                </Button>
                                <span className="px-4 font-medium">
                                    {quantity}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={increase}
                                    className="cursor-pointer"
                                >
                                    <Plus size={18} />
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-4 pt-4">
                            <Button
                                onClick={() => handleAddToCart(medicine)}
                                className="w-[48%] cursor-pointer bg-[#2B93C4] hover:bg-[#2B93C4]"
                                size="lg"
                            >
                                <ShoppingCart className="mr-2" />
                                Add to Cart
                            </Button>

                            <Button
                                onClick={() => handleBuyNow(medicine)}
                                variant="outline"
                                className="w-[48%] cursor-pointer text-[#2B93C4] border-[#2B93C4] bg-transparent hover:bg-white hover:text-[#2B93C4]"
                                size="lg"
                            >
                                <Zap className="mr-2" />
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
