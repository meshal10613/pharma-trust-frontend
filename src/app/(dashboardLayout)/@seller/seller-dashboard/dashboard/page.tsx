import OrderStatusPie from "../../../../../components/modules/seller/dashboard/OrdersPie";
import TotalsPie from "../../../../../components/modules/seller/dashboard/TotalsPie";
import { userService } from "../../../../../services/user.service";

const COLOR_MAP: Record<string, string> = {
    Category: "#2563eb",
    Order: "#16a34a",
    Medicine: "#f59e0b",
    Review: "#dc2626",

    Placed: "#2563eb",
    Processing: "#f59e0b",
    Shipped: "#7c3aed",
    Delivered: "#16a34a",
    Cancelled: "#dc2626",
};

export default async function DashboardPage() {
    const { data, error } = await userService.getSellerStats();
    if (error) return <h1>{error.message}</h1>;
    if (!data) return <h1>Loading...</h1>;
    const stats = data?.data;

    const totalsData = [
        { name: "Category", value: stats?.category.total },
        { name: "Order", value: stats.order.total },
        { name: "Medicine", value: stats.medicine.total },
        { name: "Review", value: stats.review.total },
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

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-5">Seller Dashboard</h2>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                <TotalsPie totalsData={totalsData} />
                <OrderStatusPie orderStatusData={orderStatusData} />
            </div>
        </div>
    );
}
