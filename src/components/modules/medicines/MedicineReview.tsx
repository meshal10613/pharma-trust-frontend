"use client";

import { useState } from "react";
import { Review } from "../../../types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewCard from "./ReviewCard";

export default function MedicinesReview({ reviews }: { reviews: Review[] }) {
    const [current, setCurrent] = useState(0);
    const [showFullText, setShowFullText] = useState(false);

    if (!reviews || reviews.length === 0) return null;

    const total = reviews.length;
    const getIndex = (offset: number) => (current + offset + total) % total;

    return (
        <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Customer Reviews
                </h2>
                <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
                    We deliver quality and speed you can trust — see what others
                    say about this medicine.
                </p>

                {/* Cards */}
                <div className="flex justify-center items-end gap-4">
                    {(reviews.length <= 5
                        ? reviews.map((_, i) => i)
                        : [-2, -1, 0, 1, 2]
                    ).map((offset, i) => {
                        const index =
                            reviews.length <= 5 ? offset : getIndex(offset);
                        const isActive =
                            reviews.length <= 5
                                ? index === current
                                : offset === 0;

                        return (
                            <ReviewCard
                                key={i}
                                review={reviews[index]}
                                position={
                                    reviews.length <= 5
                                        ? index - current
                                        : offset
                                }
                                isActive={isActive}
                                showFullText={isActive && showFullText}
                                onClick={() => {
                                    if (isActive) {
                                        setShowFullText((p) => !p);
                                    } else {
                                        setCurrent(index);
                                        setShowFullText(false);
                                    }
                                }}
                            />
                        );
                    })}
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                            setCurrent((p) => (p - 1 + total) % total)
                        }
                    >
                        <ArrowLeft />
                    </Button>

                    <div className="flex gap-2">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setCurrent(i);
                                    setShowFullText(false);
                                }}
                                className={`w-3 h-3 rounded-full transition ${
                                    i === current ? "bg-primary" : "bg-muted"
                                }`}
                            />
                        ))}
                    </div>

                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setCurrent((p) => (p + 1) % total)}
                    >
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </section>
    );
}
