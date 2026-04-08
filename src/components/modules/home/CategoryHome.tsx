// import { Category } from "../../../types";
// import { Badge } from "../../ui/badge";
// import { Card } from "../../ui/card";

// export default function CategoryHome({
//     categories,
// }: {
//     categories: Category[];
// }) {
//     return (
//         <div className="my-20">
//             <h2 className="text-3xl md:text-4xl font-semibold mb-5 mx-5 text-center text-primary">
//                 Categories
//             </h2>
//             <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
//                 Explore our medicine categories to quickly find what you need,
//                 from common health essentials to specialized treatments.
//             </p>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-5">
//                 {categories.map((category) => (
//                     <Card
//                         key={category.id}
//                         className="shadow-md hover:shadow-2xl flex flex-col items-center justify-center gap-2"
//                     >
//                         <h2 className="text-2xl font-semibold mb-5 flex items-center justify-center flex-wrap text-center">
//                             {category.name}
//                         </h2>
//                         <Badge variant={`outline`} className="text-[#2B93C4]">
//                             Medicines: {category.medicines.length}
//                         </Badge>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// }

"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export interface Medicine {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    manufacturer: string;
    imageUrl: string;
    categoryId: string;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: string;
    name: string;
    medicines: Medicine[];
    createdAt: string;
    updatedAt: string;
}

const ACCENTS = [
    { bar: "#378ADD", iconBg: "#E6F1FB", iconText: "#185FA5" },
    { bar: "#1D9E75", iconBg: "#E1F5EE", iconText: "#0F6E56" },
    { bar: "#D4537E", iconBg: "#FBEAF0", iconText: "#993556" },
    { bar: "#7F77DD", iconBg: "#EEEDFE", iconText: "#534AB7" },
    { bar: "#D85A30", iconBg: "#FAECE7", iconText: "#993C1D" },
    { bar: "#BA7517", iconBg: "#FAEEDA", iconText: "#854F0B" },
];

const ICONS = ["💊", "🩺", "🧪", "💉", "🩹", "🧬", "🫀", "🩻"];

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

interface CategoryCardProps {
    category: Category;
    index: number;
    onClick?: (category: Category) => void;
}

function CategoryCard({ category, index, onClick }: CategoryCardProps) {
    const accent = ACCENTS[index % ACCENTS.length];
    const icon = ICONS[index % ICONS.length];

    return (
        <Card
            onClick={() => onClick?.(category)}
            className="relative flex flex-col gap-3 overflow-hidden p-4 cursor-pointer transition-all duration-150 hover:shadow-md hover:border-gray-300 group"
        >
            {/* Top accent bar */}
            <div
                className="absolute top-0 left-0 right-0 h-0.75"
                style={{ background: accent.bar }}
            />

            {/* Header: icon + name */}
            <div className="flex items-center gap-3 mt-1">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{
                        background: accent.iconBg,
                        color: accent.iconText,
                    }}
                >
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-snug">
                        {category.name}
                    </p>
                    {/* <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                        {category.id}
                    </p> */}
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Medicine count + active badge */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-lg font-semibold text-gray-900 leading-none">
                        {category.medicines.length}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                        medicines
                    </p>
                </div>
                <Badge
                    variant="outline"
                    className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                        background: accent.iconBg,
                        color: accent.iconText,
                        borderColor: "transparent",
                    }}
                >
                    Active
                </Badge>
            </div>

            {/* Updated date */}
            <p className="text-[11px] text-gray-400">
                Updated {formatDate(category.updatedAt)}
            </p>
        </Card>
    );
}

interface CategoryGridProps {
    categories: Category[];
    onCategoryClick?: (category: Category) => void;
}

export default function CategoryGrid({
    categories,
    onCategoryClick,
}: CategoryGridProps) {
    // const totalMedicines = categories.reduce(
    //     (sum, cat) => sum + cat.medicines.length,
    //     0,
    // );

    return (
        <div className="px-5 lg:px-0 my-5">
            {/* Section header */}
            {/* <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-gray-500">
                    Medicine categories
                </h2>
                <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                    {categories.length} categories · {totalMedicines} medicines
                </span>
            </div> */}
            <h2 className="text-3xl md:text-4xl font-semibold mb-5 mx-5 text-center text-primary">
                Categories{" "}
            </h2>{" "}
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
                Explore our medicine categories to quickly find what you need,
                from common health essentials to specialized treatments.{" "}
            </p>
            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {categories.map((category, index) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        index={index}
                        onClick={onCategoryClick}
                    />
                ))}
            </div>
        </div>
    );
}
