import { cookies } from "next/headers";
import { env } from "../env";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const session = await res.json();
            if (session === null) {
                return {
                    data: null,
                    error: { message: "No session found", error: null },
                };
            }

            return { data: session, error: null };
        } catch (error) {
            console.error(error);
            return {
                data: null,
                error: { message: "Something went wrong", error },
            };
        }
    },

    getAllUsers: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/user`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const session = await res.json();
            if (session === null) {
                return {
                    data: null,
                    error: { message: "No session found", error: null },
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
};
