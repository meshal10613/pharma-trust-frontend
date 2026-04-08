import React from "react";
import { AppSidebar } from "../../components/layout/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../../components/ui/sidebar";
import { userService } from "../../services/user.service";
import { Routes } from "../../types";
import { Roles } from "../../constants/role";
import { adminRoutes } from "../../routes/adminRoutes";
import { sellerRoutes } from "../../routes/sellerRoutes";
import { userRoutes } from "../../routes/userRoutes";
import UserDropDown from "../../components/modules/myprofile/UserDropDown";

type Role = "ADMIN" | "SELLER" | "CUSTOMER";

export default async function DashboardLayout({
    admin,
    seller,
    customer,
}: Readonly<{
    admin: React.ReactNode;
    seller: React.ReactNode;
    customer: React.ReactNode;
}>) {
    const { data } = await userService.getSession();
    if (!data) return;
    const user = data.user;
    const role = data?.user?.role as Role | undefined;

    const roleView = {
        ADMIN: admin,
        SELLER: seller,
        CUSTOMER: customer,
    } as const;

    if (!role) return null;

    let routes: Routes[] = [];

    switch (user.role) {
        case Roles.admin:
            routes = adminRoutes;
            break;
        case Roles.seller:
            routes = sellerRoutes;
            break;
        case Roles.customer:
            routes = userRoutes;
            break;
        default:
            routes = [];
            break;
    }
    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                <header className="flex justify-between w-full h-16 shrink-0 items-center gap-2 border-b px-4">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                    <UserDropDown/>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {roleView[role]}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
