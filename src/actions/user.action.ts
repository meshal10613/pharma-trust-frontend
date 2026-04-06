"use server";

import { userService } from "@/services/user.service";
import { User } from "../types";
import { updateTag } from "next/cache";

export const getUser = async () => {
    return await userService.getSession();
};

export const updateUser = async (id: string, data: Partial<User>) => {
    const res = await userService.updateUser(id, data);
    updateTag("users");
    updateTag("me");
    return res;
};
