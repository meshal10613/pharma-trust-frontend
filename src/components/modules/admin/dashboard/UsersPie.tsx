"use client";

export default function UsersPie({
    usersData,
}: {
    usersData: { name: string; value: number }[];
}) {

    const totalUsers: number = usersData.reduce(
        (total, user) => total + user.value,
        0,
    );
    const totalAdmins = usersData.reduce((total, user) => {
        return user.name === "Admin" ? total + user.value : total;
    }, 0);
    const totalSellers = usersData.reduce((total, user) => {
        return user.name === "Seller" ? total + user.value : total;
    }, 0);
    const totalCustomers = usersData.reduce((total, user) => {
        return user.name === "Customer" ? total + user.value : total;
    }, 0);

    return (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <StatsCard
                    title="All Users"
                    count={totalUsers}
                    icon={<FiUsers />}
                    color="text-blue-500"
                />
                <StatsCard
                    title="Admins"
                    count={totalAdmins}
                    icon={<FiUserCheck />}
                    color="text-green-500"
                />
                <StatsCard
                    title="Sellers"
                    count={totalSellers}
                    icon={<FiUserPlus />}
                    color="text-purple-500"
                />
                <StatsCard
                    title="Customers"
                    count={totalCustomers}
                    icon={<FiUser />}
                    color="text-pink-500"
                />
            </div>
        </>
    );
}

import { FiUsers, FiUserCheck, FiUser, FiUserPlus } from "react-icons/fi";

interface StatsCardProps {
    title: string;
    count: number;
    percentage?: string;
    icon: React.ReactNode;
    color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    count,
    percentage,
    icon,
    color,
}) => {
    return (
        <div className="flex-1 border border-accent shadow-md hover:shadow-2xl rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <h2 className="text-2xl font-semibold">
                        {count.toLocaleString()}
                    </h2>
                    {percentage && (
                        <span
                            className={`text-sm font-medium mt-1 ${color || "text-gray-500"}`}
                        >
                            {percentage}
                        </span>
                    )}
                </div>
                <div
                    className={`p-3 rounded-full bg-gray-100 text-2xl ${color || "text-gray-500"}`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
};
