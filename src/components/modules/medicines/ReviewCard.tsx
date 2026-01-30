import { Quote, Star } from "lucide-react";
import Image from "next/image";

const getTranslateY = (position: number) => {
    if (Math.abs(position) === 2) return "translate-y-16";
    if (Math.abs(position) === 1) return "translate-y-8";
    return "translate-y-0";
};

export default function ReviewCard({
    review,
    position,
    isActive,
    onClick,
    showFullText,
}: any) {
    return (
        <div
            onClick={onClick}
            className={`w-64 h-80 cursor-pointer rounded-xl border bg-card p-5 shadow-sm transition-all duration-500
        ${getTranslateY(position)}
        ${isActive ? "scale-100 opacity-100 z-10" : "scale-95 opacity-50"}
      `}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                {/* <Image src={logo} alt="logo" width={28} height={28} /> */}
                <Quote className="w-6 h-6 text-muted-foreground" />

                {/* Stars */}
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                            key={n}
                            className={`w-4 h-4 ${
                                n <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Comment */}
            <div className="text-sm text-muted-foreground overflow-y-auto h-45 pr-1">
                <p className={showFullText ? "" : "line-clamp-5"}>
                    {review.comment}
                </p>
            </div>

            {/* User */}
            <div className="flex items-center gap-3 mt-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border">
                    <Image
                        src={
                            review.user.image ||
                            `https://img.daisyui.com/images/profile/demo/spiderperson@192.webp`
                        }
                        alt={review.user.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                    />
                </div>

                <div className="text-left">
                    <p className="text-sm font-semibold">{review.user.name}</p>
                </div>
            </div>
        </div>
    );
}
