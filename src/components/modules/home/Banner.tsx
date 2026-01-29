import Image from "next/image";
import banner from "../../../../public/banner.avif";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pill } from "lucide-react";

export default function Banner() {
    return (
        <div className="relative w-full h-125 md:h-150 overflow-hidden">
            {/* Background Image */}
            <Image
                src={banner}
                alt="PharmaTrust Healthcare Banner"
                fill
                priority
                placeholder="blur" // Adds a blur effect while loading
                className="object-cover object-center"
            />

            {/* Dark Gradient Overlay - Makes text readable */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4 md:px-8 text-white">
                <div className="max-w-2xl space-y-6">
                    {/* Badge / Small Title */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm text-[#80C6E0] text-sm font-medium">
                        <Pill className="w-4 h-4" />
                        <span>#1 Trusted Online Pharmacy</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                        Your Health Is Our <br />
                        <span className="text-[#2B93C4]">Top Priority</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-200 opacity-90">
                        Welcome to <strong>PharmaTrust</strong>. Order genuine
                        medicines, vitamins, and personal care products
                        delivered straight to your doorstep with 24/7 expert
                        support.
                    </p>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-row gap-4 pt-4">
                        <Button
                            size="lg"
                            className="text-lg px-8 bg-[#2B93C4] hover:bg-[#2B93C4] font-semibold cursor-pointer"
                        >
                            Shop Now
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="text-lg px-8 text-white bg-transparent hover:bg-white transition-colors cursor-pointer"
                        >
                            Upload Prescription
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
