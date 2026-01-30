"use client";

import { CheckCircle, Truck, Shield, Headset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    {
        title: "Genuine Medicines",
        icon: <CheckCircle className="w-6 h-6 text-primary" />,
        description: "All medicines are 100% authentic and verified.",
    },
    {
        title: "Licensed Sellers",
        icon: <Shield className="w-6 h-6 text-primary" />,
        description: "Our sellers are verified and licensed for safe products.",
    },
    {
        title: "Fast Delivery",
        icon: <Truck className="w-6 h-6 text-primary" />,
        description: "Get your order delivered quickly to your doorstep.",
    },
    {
        title: "Easy Returns & Support",
        icon: <Headset className="w-6 h-6 text-primary" />,
        description: "Hassle-free returns and 24/7 customer support.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-16 bg-base-100">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary">
                    Why Choose Us?
                </h2>
                <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
                    We provide trusted services to ensure your health and
                    safety.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="p-6 hover:shadow-lg transition-shadow"
                        >
                            <CardHeader className="flex flex-col items-center gap-4">
                                {feature.icon}
                                <CardTitle className="text-lg font-semibold text-center">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-center text-muted-foreground">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
