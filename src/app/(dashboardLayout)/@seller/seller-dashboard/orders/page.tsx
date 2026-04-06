import OrderTable from "../../../../../components/modules/admin/orders/OrderTable";
import { orderService } from "../../../../../services/order.service";
import { Order } from "../../../../../types";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
	const { data, error } = await orderService.getAllOrders();
		if (error) return <h1>{error.message}</h1>;
		if (!data) return <h1>Loading...</h1>;
		const orders: Order[] = data.data;
	
		return (
			<div>
				<h2 className="text-2xl font-semibold mb-5">All Orders</h2>
				<OrderTable orders={orders}/>
			</div>
		);
}