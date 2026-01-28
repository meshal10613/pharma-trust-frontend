import UserTable from "../../../../../components/modules/admin/users/UserTable";
import { userService } from "../../../../../services/user.service";

export const metadata = {
    title: "User Management | Admin Dashboard",
};

export default async function UsersPage() {
    const { data } = await userService.getAllUsers();
    const users = data.data;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-5">User Management</h2>
            <UserTable users={users} />
        </div>
    );
}
