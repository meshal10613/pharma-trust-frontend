"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { toast } from "sonner";
import { authClient } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import { logout } from "../../../store/slice/userSlice";
import { LogOut } from "lucide-react";

export default function UserDropDown() {
	const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const loading = useSelector((state: RootState) => state.user.loading);
	const router = useRouter();

    if (loading || !user) return null;

    const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");
        try {
            await authClient.signOut();
            dispatch(logout());
            toast.success("Logged out successfully", { id: toastId });
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Failed to logout", { id: toastId });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <span className="rounded-full ring-2 ring-transparent hover:ring-[#FF5100]/30 transition-all duration-200 focus:outline-none focus:ring-[#FF5100]/40 cursor-pointer">
                    <Avatar className="h-8 w-8 relative">
                        <AvatarImage
                            src={
                                user?.image ||
                                "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                            }
                            alt={user.name}
                            className="rounded-full object-cover"
                        />
                    </Avatar>
                </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52 mt-1">
                {/* User info */}
                <div className="px-3 py-2.5">
                    <p className="text-sm font-semibold text-zinc-900 truncate">
                        {user.name}
                    </p>
                    <p className="text-xs text-zinc-500 truncate mt-0.5">
                        {user.email}
                    </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
