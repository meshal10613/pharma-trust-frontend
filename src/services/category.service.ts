import { cookies } from "next/headers";
import { env } from "../env";

const API_URL = env.API_URL;
const NEXT_PUBLIC_BACKEND_API_URL = env.NEXT_PUBLIC_BACKEND_API_URL

export const categoryService = {
    getAllCategorys: async () => {
        try {
            const res = await fetch(`${NEXT_PUBLIC_BACKEND_API_URL}/category`, {
                next: { tags: ["categories"], revalidate: 60 },
            });
            const session = await res.json();
            if (session === null) {
                return {
                    data: null,
                    error: { message: "No category found", error: null },
                };
            }

            return { data: session, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
    getAllCategorysServer: async () => {
        try {
            const res = await fetch(`${API_URL}/category`, {
                next: { tags: ["categories"], revalidate: 60 },
            });
            const session = await res.json();
            if (session === null) {
                return {
                    data: null,
                    error: { message: "No category found", error: null },
                };
            }

            return { data: session, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
    addCategory: async (name: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ name }),
                cache: "no-store",
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                return {
                    data: null,
                    error: {
                        message:
                            errBody?.message ?? "Failed to create category",
                        error: errBody ?? null,
                    },
                };
            }

            const created = await res.json();
            return { data: created, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
    deleteCategory: async (id: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/category/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            // Some APIs return 204 with no body
            const data = await res.json().catch(() => null);

            if (!res.ok) {
                return {
                    data: null,
                    error: {
                        message: data?.message ?? "Failed to delete category",
                        error: data ?? null,
                    },
                };
            }

            return { data, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    updateCategory: async (id: string, name: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/category/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ name }),
                cache: "no-store",
            });

            // Some APIs return 204 No Content
            const data = await res.json().catch(() => null);

            if (!res.ok) {
                return {
                    data: null,
                    error: {
                        message: data?.message ?? "Failed to update category",
                        error: data ?? null,
                    },
                };
            }

            return { data, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
};
