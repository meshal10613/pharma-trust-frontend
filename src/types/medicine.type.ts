import { Category } from "./category.type";
import { OrderItem } from "./order.type";
import { Review } from "./review.type";
import { User } from "./user.type";

export interface Medicine {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    manufacturer: string;
    imageUrl: string | null; // String? in Prisma => string | null in TS

    categoryId: string;
    sellerId: string;

    createdAt: Date;
    updatedAt: Date;

    // Relations (usually optional, depending on your query)
    category?: Category;
    seller?: User;
    orderItems?: OrderItem[];
    reviews?: Review[];
}
