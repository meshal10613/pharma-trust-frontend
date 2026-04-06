"use client";

import useLoadUser from "../../hooks/userLoadUser";

export default function AuthLoader() {
    useLoadUser();
    return null;
}
