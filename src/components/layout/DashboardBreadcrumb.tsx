"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "../ui/breadcrumb";

export function DashboardBreadcrumb() {
    const segments = useSelectedLayoutSegments();

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.map((segment, index) => (
                    <BreadcrumbItem key={index}>
                        <BreadcrumbPage className="capitalize">
                            {segment.replace("-", " ")}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
