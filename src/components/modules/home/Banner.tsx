import Image from "next/image";
import banner from "../../../../public/banner.webp";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pill } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";

export default function Banner() {
    return (
        <div className="container mx-auto space-y-10 mt-5">
            {/* <div className="relative w-full h-125 md:h-150 overflow-hidden mt-5">
                <Image
                    src={banner}
                    alt="PharmaTrust Healthcare Banner"
                    fill
                    priority
                    placeholder="blur"
                    className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

                <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-4 md:px-8 text-white">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm text-[#80C6E0] text-sm font-medium">
                            <Pill className="w-4 h-4" />
                            <span>#1 Trusted Online Pharmacy</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                            Your Health Is Our <br />
                            <span className="text-[#2B93C4]">Top Priority</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-200 opacity-90">
                            Welcome to <strong>PharmaTrust</strong>. Order
                            genuine medicines, vitamins, and personal care
                            products delivered straight to your doorstep with
                            24/7 expert support.
                        </p>

                        <div className="flex flex-row gap-4 pt-4">
                            <Link href={`#medicine-home`}>
                                <Button
                                    size="lg"
                                    className="text-lg px-8 bg-[#2B93C4] hover:bg-[#2B93C4] font-semibold cursor-pointer"
                                >
                                    Shop Now
                                </Button>
                            </Link>

                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg px-8 text-white hover:text-primary bg-transparent hover:bg-white transition-colors cursor-pointer"
                            >
                                Get Started
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="relative lg:rounded-2xl bg-linear-to-br from-primary via-primary/70 to-primary/40 text-white overflow-hidden p-10 md:p-14 lg:p-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
                <div className="absolute bottom-0 right-24 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
                <div className="relative z-10 max-w-xl">
                    <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/20">
                        🚀 Fast 24-hour delivery
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                        Your Health,
                        <br />
                        Delivered Fast 🌿
                    </h1>
                    <p className="text-emerald-100 text-base mb-6 leading-relaxed">
                        Order medicines, supplements and healthcare products
                        from trusted sellers across Bangladesh.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                        <Button size="lg">
                            <Link href="/medicines">Browse Medicines</Link>
                        </Button>
                        <Button size="lg" variant="outline">
                            <Link href={`/about`} className="text-primary">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    ["💊", "500+", "Medicines"],
                    ["🏪", "50+", "Sellers"],
                    ["🚚", "24hr", "Delivery"],
                    ["⭐", "4.8", "Rating"],
                ].map(([e, v, l]) => (
                    <Card key={l} className="text-center border-slate-200">
                        <CardContent className="pt-6 pb-4">
                            <div className="text-3xl mb-2">{e}</div>
                            <div className="text-2xl font-bold text-primary">
                                {v}
                            </div>
                            <div className="text-sm text-slate-500 mt-0.5">
                                {l}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
