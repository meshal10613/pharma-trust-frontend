import React from "react";
import { Separator } from "@radix-ui/react-separator";
import { AppSidebar } from "../../components/layout/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../../components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { userService } from "../../services/user.service";

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
    const user = data.user;
    const role = data?.user?.role as Role | undefined;

    const roleView = {
        ADMIN: admin,
        SELLER: seller,
        CUSTOMER: customer,
    } as const;

    if (!role) return null;

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Data Fetching
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {roleView[role]}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
