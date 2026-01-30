import { cookies } from "next/headers";
import { env } from "../env";
import { CreateMedicine, UpdateMedicine } from "../types";

const API_URL = env.API_URL;

interface GetMedicineParams {
    search?: string;
    page?: string;
    limit?: string;
    sortOrder?: string;
    sortBy?: string;
}

export const medicineService = {
    getAllMedicines: async (params?: GetMedicineParams) => {
        try {
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/medicine`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.set(key, value);
                    }
                });
            }

            const config: RequestInit = {
                headers: {
                    Cookie: cookieStore.toString(),
                },
            };

            config.next = {
                ...config.next,
                tags: ["medicines"],
            };
            
            const res = await fetch(url.toString(), config);
            const session = await res.json();
            if (session === null) {
                return {
                    data: null,
                    error: { message: "No medicine found", error: null },
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

    getMedicineById: async (id: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/medicine/${id}`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const session = await res.json();
            if (session === null) {
                return {
                    data: null,
                    error: { message: "No medicine found", error: null },
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

    deleteMedicine: async (id: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/medicine/${id}`, {
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
                        message: data?.message ?? "Failed to delete medicine",
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

    updateMedicine: async (id: string, data: UpdateMedicine) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/medicine/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
                cache: "no-store",
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                return {
                    data: null,
                    error: {
                        message:
                            errBody?.message ?? "Failed to update medicine",
                        error: errBody ?? null,
                    },
                };
            }

            const updated = await res.json();
            return { data: updated, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    createMedicine: async (data: CreateMedicine) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/medicine`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
                cache: "no-store",
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                return {
                    data: null,
                    error: {
                        message:
                            errBody?.message ?? "Failed to create medicine",
                        error: errBody ?? null,
                    },
                };
            }

            const updated = await res.json();
            return { data: updated, error: null };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },
};
