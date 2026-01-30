import CheckoutPage from "../../../components/modules/checkout/CheckoutPage";
import { userService } from "../../../services/user.service";
import { User } from "../../../types";

export default async function Checkout() {
    const { data: u } = await userService.getSession();
    const user: User = u.user;

    return (
        <div className="container mx-auto my-10">
            <CheckoutPage user={user} />
        </div>
    );
}
