import Link from "next/link";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
            <div className="rounded-2xl bg-linear-to-br from-primary to-primary/40 text-white text-center px-6 py-16">
                <h1 className="text-4xl font-bold mb-4">About MediShop 🌿</h1>
                <p className="text-emerald-100 text-base max-w-lg mx-auto leading-relaxed">
                    Bangladesh&apos;s trusted online pharmacy platform,
                    connecting patients with verified medicine sellers since
                    2026.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                    [
                        "🏆",
                        "Our Mission",
                        "Make quality medicines accessible to every person in Bangladesh at fair, transparent prices.",
                    ],
                    [
                        "🔒",
                        "Safety First",
                        "Every seller is verified. Every medicine is checked for authenticity and quality.",
                    ],
                    [
                        "🚀",
                        "Fast Delivery",
                        "24-hour delivery to major cities. Same-day in Dhaka and Chittagong.",
                    ],
                ].map(([e, t, d]) => (
                    <Card
                        key={t}
                        className="border-primary/20 bg-primary/10 text-center"
                    >
                        <CardContent className="pt-8 pb-6">
                            <div className="text-4xl mb-3">{e}</div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">
                                {t}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {d}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className="border-slate-200">
                <CardHeader>
                    <CardTitle className="text-xl">How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            ["1", "Browse", "Search 500+ medicines"],
                            ["2", "Order", "Checkout with bKash or card"],
                            ["3", "Track", "Real-time order tracking"],
                            ["4", "Receive", "Safe packaged delivery"],
                        ].map(([n, t, d]) => (
                            <div key={n} className="text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-3">
                                    {n}
                                </div>
                                <h4 className="font-semibold text-slate-900 mb-1">
                                    {t}
                                </h4>
                                <p className="text-xs text-slate-400">{d}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    Ready to get started?
                </h2>
                <p className="text-slate-500 mb-5">
                    Join 1,200+ customers who trust MediShop for their
                    healthcare needs.
                </p>
                <Button asChild size="lg">
                    <Link
                        href={`medicines`}
                    >
                        Browse Medicines →
                    </Link>
                </Button>
            </div>
        </div>
    );
}
