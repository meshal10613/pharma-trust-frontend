"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function TotalsPie({
    totalsData,
}: {
    totalsData: { name: string; value: number }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Overall Totals</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={totalsData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={90}
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
