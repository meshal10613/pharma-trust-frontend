"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, Shield, Truck, Headset } from "lucide-react";

const features = [
    {
        title: "Genuine medicines",
        description:
            "Every product is 100% authentic, sourced from verified manufacturers and quality-checked before dispatch.",
        tag: "100% verified",
        icon: CheckCircle,
        iconColor: "text-teal-700 dark:text-teal-300",
        iconBg: "bg-teal-50 dark:bg-teal-950",
        dotColor: "bg-teal-500",
        tagColor: "text-teal-700 dark:text-teal-300",
        borderAccent: "hover:border-teal-200 dark:hover:border-teal-800",
    },
    {
        title: "Licensed sellers",
        description:
            "All our sellers hold valid licenses and pass strict compliance checks so you always get safe, regulated products.",
        tag: "Fully licensed",
        icon: Shield,
        iconColor: "text-blue-700 dark:text-blue-300",
        iconBg: "bg-blue-50 dark:bg-blue-950",
        dotColor: "bg-blue-500",
        tagColor: "text-blue-700 dark:text-blue-300",
        borderAccent: "hover:border-blue-200 dark:hover:border-blue-800",
    },
    {
        title: "Fast delivery",
        description:
            "Orders reach your doorstep quickly with real-time tracking and guaranteed timeslots in most areas.",
        tag: "Express shipping",
        icon: Truck,
        iconColor: "text-amber-700 dark:text-amber-300",
        iconBg: "bg-amber-50 dark:bg-amber-950",
        dotColor: "bg-amber-500",
        tagColor: "text-amber-700 dark:text-amber-300",
        borderAccent: "hover:border-amber-200 dark:hover:border-amber-800",
    },
    {
        title: "Easy returns & support",
        description:
            "No-hassle returns policy and a 24/7 support team ready to resolve any issue, any time.",
        tag: "24/7 available",
        icon: Headset,
        iconColor: "text-violet-700 dark:text-violet-300",
        iconBg: "bg-violet-50 dark:bg-violet-950",
        dotColor: "bg-violet-500",
        tagColor: "text-violet-700 dark:text-violet-300",
        borderAccent: "hover:border-violet-200 dark:hover:border-violet-800",
    },
];

function FeatureCard({
    feature,
    index,
}: {
    feature: (typeof features)[0];
    index: number;
}) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const Icon = feature.icon;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), index * 80);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 },
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [index]);

    return (
        <div
            ref={ref}
            className={[
                "group flex flex-col gap-4 rounded-xl border border-border bg-background p-6",
                "transition-all duration-300",
                feature.borderAccent,
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
            ].join(" ")}
            style={{ transitionDelay: visible ? "0ms" : `${index * 80}ms` }}
        >
            {/* Icon */}
            <div
                className={[
                    "w-10 h-10 mx-auto rounded-lg flex items-center justify-center shrink-0",
                    feature.iconBg,
                ].join(" ")}
            >
                <Icon
                    className={["w-4.5 4.5", feature.iconColor].join(
                        " ",
                    )}
                    strokeWidth={2}
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
                <p className="text-[15px] font-medium text-foreground leading-snug">
                    {feature.title}
                </p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                    {feature.description}
                </p>
            </div>

            {/* Footer tag */}
            <div className="mt-auto pt-3 border-t border-border flex items-center justify-center gap-2">
                <span
                    className={[
                        "w-1.5 h-1.5 rounded-full shrink-0",
                        feature.dotColor,
                    ].join(" ")}
                />
                <span
                    className={[
                        "text-[12px] font-medium",
                        feature.tagColor,
                    ].join(" ")}
                >
                    {feature.tag}
                </span>
            </div>
        </div>
    );
}

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            feature={feature}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
