"use client";

import Image from "next/image";
import { Medicine } from "../../../types";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/slice/cartSlice";
import Link from "next/link";
import { RootState } from "../../../store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MedicineHome({ medicines }: { medicines: Medicine[] }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const loading = useSelector((state: RootState) => state.user.loading);

    const handleAddToCart = (medicine: Medicine) => {
        if (!loading && user) {
            const data = {
                medicine,
                quantity: 1,
            };
            dispatch(addToCart(data));
            toast.success(`${medicine.name} added to cart`);
        }else{
            toast.error("Please login to add to cart");
            router.push("/login");
        }
    };

    return (
        <div className="my-20">
            <h2
                id="medicine-home"
                className="text-3xl md:text-4xl font-semibold mb-5 text-center text-primary"
            >
                Medicines
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
                Browse our wide range of high-quality medicines, carefully
                sourced from trusted sellers to ensure your health and safety.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mx-5">
                {medicines.map((medicine: Medicine) => (
                    <Card
                        key={medicine.id}
                        className="w-full max-w-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 pt-0 mx-auto"
                    >
                        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                            <Image
                                src={
                                    medicine.imageUrl ||
                                    "https://placehold.co/600x400?text=No+Image"
                                }
                                alt={medicine.name}
                                fill
                                className="object-cover transition-transform hover:scale-105 duration-500"
                            />
                            <Badge className="absolute top-2 left-2 bg-white text-[#2B93C4] dark:bg-black dark:text-[#2B93C4]">
                                {medicine.category?.name}
                            </Badge>

                            <Badge
                                variant={
                                    medicine.stock === 0
                                        ? "destructive"
                                        : "secondary"
                                }
                                className="absolute top-2 right-2 backdrop-blur-md bg-white/80 text-black"
                            >
                                {medicine.stock === 0
                                    ? "Out of Stock"
                                    : `${medicine.stock} in stock`}
                            </Badge>
                        </div>

                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">
                                        {medicine.manufacturer}
                                    </p>
                                    <Link
                                        href={`/medicines/${medicine.id}`}
                                        className="text-xl line-clamp-1"
                                        title={medicine.name}
                                    >
                                        {medicine.name}
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="grow">
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {medicine.description}
                            </p>

                            {/* <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-md w-fit">
                                <Store className="w-3 h-3" />
                                <span>Sold by: {medicine.seller?.name}</span>
                            </div> */}
                        </CardContent>

                        <CardFooter className="flex items-center justify-between border-t pt-4">
                            <div>
                                <span className="text-2xl font-bold text-primary">
                                    ৳{medicine.price.toFixed(2)}
                                </span>
                            </div>

                            <Button
                                onClick={() => handleAddToCart(medicine)}
                                disabled={medicine.stock === 0}
                                size="sm"
                                className="gap-2 cursor-pointer bg-[#2B93C4] hover:bg-[#2B93C4]"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {medicine.stock === 0
                                    ? "Unavailable"
                                    : "Add to Cart"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
