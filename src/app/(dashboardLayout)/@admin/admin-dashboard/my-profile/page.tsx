import { User } from "../../../../../types";
import MyProfile from "../../../../../components/modules/MyProfile";
import { userService } from "../../../../../services/user.service";

export default async function AdminProfile() {
    const { data, error } = await userService.getMyProfile();
    if (error) return <h1>{error.message}</h1>;
    if (!data) return <h1>Loading...</h1>;
    const user: User = data.data;

    return (
        <>
            <MyProfile user={user} />

            {/* <h2 className="text-2xl font-semibold mb-5">Update Password</h2> */}
        </>
    );
}
