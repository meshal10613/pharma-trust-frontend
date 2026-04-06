"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../../../lib/auth-client";
// import { SidebarMenuButton } from "../../ui/sidebar";
import { LogOut } from "lucide-react";
import { Button } from "../../ui/button";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slice/userSlice";

export default function Logout() {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");
        try {
            await authClient.signOut();
            dispatch(logout());
            toast.success("Logged out successfully", { id: toastId });

            router.refresh();
            router.replace("/");
        } catch (error) {
            console.log(error);
            toast.error("Failed to logout", { id: toastId });
        }
    };

    return (
        <Button
            variant={`outline`}
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 flex items-center justify-center cursor-pointer w-full"
        >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
    );
}
