import { userService } from "../../../../../services/user.service";
import OrderStatusPie from "../../../../../components/modules/seller/dashboard/OrdersPie";
import TotalsPie from "../../../../../components/modules/seller/dashboard/TotalsPie";
import UsersPie from "../../../../../components/modules/admin/dashboard/UsersPie";
import OrderAmountStatusPie from "../../../../../components/modules/admin/dashboard/OrderAmountStatusPie";

const COLOR_MAP: Record<string, string> = {
    Admin: "#2563eb",
    Seller: "#16a34a",
    Customer: "#f59e0b",

    Category: "#0ea5e9",
    Order: "#22c55e",
    Medicine: "#eab308",
    Review: "#ef4444",
    User: "#8b5cf6",

    Placed: "#3b82f6",
    Processing: "#f97316",
    Shipped: "#6366f1",
    Delivered: "#10b981",
    Cancelled: "#b91c1c",

    "Placed Amount": "#60a5fa",
    "Processing Amount": "#fb923c",
    "Shipped Amount": "#818cf8",
    "Delivered Amount": "#34d399",
    "Cancelled Amount": "#ef4444",
};

export default async function DashboardPage() {
    const { data, error } = await userService.getAdminStats();
    if (error) return <h1>{error.message}</h1>;
    if (!data) return <h1>Loading...</h1>;
    const stats = data.data;
    
    const usersData = [
        { name: "Admin", value: stats.user.admin },
        { name: "Seller", value: stats.user.seller },
        { name: "Customer", value: stats.user.customer },
    ]
        .filter((item) => item.value > 0)
        .map((item) => ({
            ...item,
            fill: COLOR_MAP[item.name],
        }));

    const totalsData = [
        { name: "Category", value: stats.category.total },
        { name: "Order", value: stats.order.total },
        { name: "Medicine", value: stats.medicine.total },
        { name: "Review", value: stats.review.total },
        { name: "User", value: stats.user.total },
    ]
        .filter((item) => item.value > 0)
        .map((item) => ({
            ...item,
            fill: COLOR_MAP[item.name],
        }));

    const orderStatusData = [
        { name: "Placed", value: stats.order.placed },
        { name: "Processing", value: stats.order.processing },
        { name: "Shipped", value: stats.order.shipped },
        { name: "Delivered", value: stats.order.delivered },
        { name: "Cancelled", value: stats.order.cancelled },
    ]
        .filter((item) => item.value > 0)
        .map((item) => ({
            ...item,
            fill: COLOR_MAP[item.name],
        }));

    const orderAmountStatusData = [
        { name: "Placed Amount", value: stats.order.placedAmount },
        { name: "Processing Amount", value: stats.order.processingAmount },
        { name: "Shipped Amount", value: stats.order.shippedAmount },
        { name: "Delivered Amount", value: stats.order.deliveredAmount },
        { name: "Cancelled Amount", value: stats.order.cancelledAmount },
    ]
        .filter((item) => item.value > 0)
        .map((item) => ({
            ...item,
            fill: COLOR_MAP[item.name],
        }));

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-5">Admin Dashboard</h2>
            <UsersPie usersData={usersData} />
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                <TotalsPie totalsData={totalsData} />
                <OrderStatusPie orderStatusData={orderStatusData} />
                <OrderAmountStatusPie
                    orderAmountStatusData={orderAmountStatusData}
                />
            </div>
        </div>
    );
}
