export enum Role {
    CUSTOMER,
    SELLER,
    ADMIN,
}

export enum UserStatus {
    ACTIVE,
    BANNED
}

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    phone: string | null;
    role: Role;
    status: UserStatus;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}
