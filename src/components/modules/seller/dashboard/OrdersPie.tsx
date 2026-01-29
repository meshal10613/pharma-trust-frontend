"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function OrderStatusPie({
    orderStatusData,
}: {
    orderStatusData: { name: string; value: number }[];
}) {
    return (
        <Card className="shadow-md hover:shadow-2xl">
            <CardHeader>
                <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={orderStatusData}
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
