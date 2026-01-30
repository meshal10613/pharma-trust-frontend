import { Medicine } from "./medicine.type";
import { User } from "./user.type";

export interface Review {
    id: string;
    rating: number; // 1–5
    comment: string | null; // String? => string | null

    userId: string;
    medicineId: string;

    createdAt: Date;

    // Relations
    user?: User;
    medicine?: Medicine;
}