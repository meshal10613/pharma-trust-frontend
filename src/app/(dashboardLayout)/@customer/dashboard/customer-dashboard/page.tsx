import OrderAmountStatus from "../../../../../components/modules/admin/dashboard/OrderAmountStatusPie";
import OrderStatusPie from "../../../../../components/modules/seller/dashboard/OrdersPie";
import TotalsPie from "../../../../../components/modules/seller/dashboard/TotalsPie";
import { userService } from "../../../../../services/user.service";

const COLOR_MAP: Record<string, string> = {
    Order: "#16a34a",
    Review: "#dc2626",

    Placed: "#2563eb",
    Processing: "#f59e0b",
    Shipped: "#7c3aed",
    Delivered: "#16a34a",
    Cancelled: "#dc2626",

    "Placed Amount": "#60a5fa",
    "Processing Amount": "#fb923c",
    "Shipped Amount": "#818cf8",
    "Delivered Amount": "#34d399",
    "Cancelled Amount": "#ef4444",
};

export default async function CustomerDashboard() {
    const { data, error } = await userService.getCustomerStats();
    if (error) return <h1>{error.message}</h1>;
    if (!data) return <h1>Loading...</h1>;
    const stats = data.data;
    console.log(stats);

    const totalsData = [
        { name: "Order", value: stats.ordersCount },
        { name: "Review", value: stats.reviewsCount },
    ]
        .filter((item) => item.value > 0)
        .map((item) => ({
            ...item,
            fill: COLOR_MAP[item.name],
        }));

    const orderStatusData = [
        { name: "Placed", value: stats.orderCountByStatus.PLACED },
        { name: "Processing", value: stats.orderCountByStatus.PROCESSING },
        { name: "Shipped", value: stats.orderCountByStatus.SHIPPED },
        { name: "Delivered", value: stats.orderCountByStatus.DELIVERED },
        { name: "Cancelled", value: stats.orderCountByStatus.CANCELLED },
    ]
        .filter((item) => item.value > 0)
        .map((item) => ({
            ...item,
            fill: COLOR_MAP[item.name],
        }));

    const orderAmountStatusData = [
        { name: "Placed Amount", value: stats.orderAmountByStatus.PLACED },
        {
            name: "Processing Amount",
            value: stats.orderAmountByStatus.PROCESSING,
        },
        { name: "Shipped Amount", value: stats.orderAmountByStatus.SHIPPED },
        {
            name: "Delivered Amount",
            value: stats.orderAmountByStatus.DELIVERED,
        },
        {
            name: "Cancelled Amount",
            value: stats.orderAmountByStatus.CANCELLED,
        },
    ]
        .filter((item) => item.value > 0)
        .map((item) => ({
            ...item,
            fill: COLOR_MAP[item.name],
        }));

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-5">Customer Dashboard</h2>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                <TotalsPie totalsData={totalsData} />
                <OrderStatusPie orderStatusData={orderStatusData} />
                <OrderAmountStatus
                    orderAmountStatusData={orderAmountStatusData}
                />
            </div>
        </div>
    );
}
