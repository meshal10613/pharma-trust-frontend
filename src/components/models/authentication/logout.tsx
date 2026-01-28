"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "../../../lib/auth-client";
import { SidebarMenuButton } from "../../ui/sidebar";
import { LogOut } from "lucide-react";

export default function Logout() {
    const router = useRouter();

    const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");
        try {
            await authClient.signOut();
            toast.success("Logged out successfully", { id: toastId });

            router.push("/");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Failed to logout", { id: toastId });
        }
    };

    return (
        <SidebarMenuButton
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 flex items-center justify-center cursor-pointer"
        >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </SidebarMenuButton>
    );
}
