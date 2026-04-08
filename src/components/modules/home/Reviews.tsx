"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Review } from "../../../types";
import Marquee from "react-fast-marquee";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400" : "text-gray-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

const AVATAR_COLORS = [
    { bg: "#E6F1FB", text: "#185FA5" },
    { bg: "#E1F5EE", text: "#0F6E56" },
    { bg: "#EEEDFE", text: "#534AB7" },
    { bg: "#FBEAF0", text: "#993556" },
    { bg: "#FAECE7", text: "#993C1D" },
    { bg: "#FAEEDA", text: "#854F0B" },
];

function ReviewCard({ review, index }: { review: Review; index: number }) {
    const userName = review.user?.name ?? "Anonymous";
    const medicineName = review.medicine?.name ?? null;
    const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
    const date = new Date(review.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <Card className="w-70 shrink-0 mx-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center gap-3">
                    {review.user?.image ? (
                        <img
                            src={review.user.image}
                            alt={userName}
                            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                        />
                    ) : (
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                            style={{ background: color.bg, color: color.text }}
                        >
                            {getInitials(userName)}
                        </div>
                    )}
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {userName}
                        </p>
                        {medicineName && (
                            <p className="text-[11px] text-gray-400 truncate">
                                {medicineName}
                            </p>
                        )}
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between">
                    <StarRating rating={review.rating} />
                    <span className="text-[11px] text-gray-400">{date}</span>
                </div>

                {/* Comment */}
                {review.comment && (
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        &quot;{review.comment}&quot;
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
    if (reviews.length === 0) return null;

    return (
        <div className="overflow-hidden py-6">
            {/* Section label */}
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary">
                    Customer Reviews
                </h2>
                <p className="text-muted-foreground mb-10 mx-auto text-center max-w-2xl">
                    Our customers love us! Read what they have to say about
                    their experience
                </p>
            </div>

            {/* Marquee track */}
            <div className="relative">
                {/* Fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-linear-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-linear-to-l from-white to-transparent" />

                <Marquee speed={50} gradient={false}>
                    <div className="flex animate-marquee">
                        {reviews.map((review, i) => (
                                <ReviewCard
                                    key={`${review.id}-${i}`}
                                    review={review}
                                    index={i}
                                />
                        ))}
                    </div>
                </Marquee>
            </div>
        </div>
    );
}
