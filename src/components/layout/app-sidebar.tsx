import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Routes } from "../../types";
import Link from "next/link";
import { Roles } from "../../constants/role";
import { adminRoutes } from "../../routes/adminRoutes";
import { sellerRoutes } from "../../routes/sellerRoutes";
import { userRoutes } from "../../routes/userRoutes";
import Logout from "../modules/authentication/logout";

export function AppSidebar({
    user,
    ...props
}: {
    user: { role: string };
} & React.ComponentProps<typeof Sidebar>) {
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
        <Sidebar {...props}>
            <SidebarContent>
                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent className="mt-5">
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url} className="flex items-center justify-center">
                                                {item.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Logout />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
