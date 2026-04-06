import MyOrdersTable from "../../../../../components/modules/customer/MyOrdersTable";
import { orderService } from "../../../../../services/order.service";
import { userService } from "../../../../../services/user.service";
import { Order, User } from "../../../../../types";

export const dynamic = "force-dynamic";

export default async function MyOrdersPage() {
    const { data: u, error: e } = await userService.getMyProfile();
    if (e) return <h1>{e.message}</h1>;
    if (!u) return <h1>Loading...</h1>;
    const user: User = u?.data;

    if (!user) return null;

    const { data, error } = await orderService.getMyOrders(user.id);
    if (error) return <h1>{error.message}</h1>;
    if (!data) return <h1>Loading...</h1>;
    const orders: Order[] = data.data;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-5">My Orders</h2>
            <MyOrdersTable orders={orders} user={user} />
        </div>
    );
}
