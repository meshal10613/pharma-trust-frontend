"use client";

import { Provider } from "react-redux";
import { ReactNode, useEffect } from "react";
import { store } from "@/store";
import { saveCartToStorage } from "../../utils/cartStorage";

export default function ReduxProviderWrapper({
    children,
}: {
    children: ReactNode;
}) {
        useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const { cart } = store.getState();
            saveCartToStorage(cart.items);
        });

        return unsubscribe;
    }, []);

    return <Provider store={store}>{children}</Provider>;
}