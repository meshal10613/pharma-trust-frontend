"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function OrderAmountStatusPie({
    orderAmountStatusData,
}: {
    orderAmountStatusData: { name: string; value: number }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Amount Status</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={orderAmountStatusData}
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