import { Medicine } from "./medicine.type";
import { Order } from "./order.type";
import { Review } from "./review.type";

export enum Role {
    CUSTOMER = "CUSTOMER",
    SELLER = "SELLER",
    ADMIN = "ADMIN",
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED",
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
    status: UserStatus;

    // Relations
    sessions?: Session[];
    accounts?: Account[];
    medicines?: Medicine[]; // SellerMedicines
    orders?: Order[]; // CustomerOrders
    reviews?: Review[];
}

export interface Session {
    id: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
    userId: string;

    // Relations
    user?: User;
}

export interface Account {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;

    accessToken?: string | null;
    refreshToken?: string | null;
    idToken?: string | null;

    accessTokenExpiresAt?: Date | null;
    refreshTokenExpiresAt?: Date | null;

    scope?: string | null;
    password?: string | null;

    createdAt: Date;
    updatedAt: Date;

    // Relations
    user?: User;
}

export interface Verification {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}