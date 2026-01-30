import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Medicine } from "../../types";

export interface CheckoutItem {
    medicine: Medicine;
    quantity: number;
}

export interface CheckoutState {
    items: CheckoutItem[];
}

const initialState: CheckoutState = {
    items: [],
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        addToCheckout: (
            state,
            action: PayloadAction<{ medicine: Medicine; quantity?: number }>,
        ) => {
            const { medicine, quantity = 1 } = action.payload;

            const existingItem = state.items.find(
                (item) => item.medicine.id === medicine.id,
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    medicine,
                    quantity,
                });
            }
        },

        removeOneFromCheckout: (state, action: PayloadAction<string>) => {
            const itemIndex = state.items.findIndex(
                (item) => item.medicine.id === action.payload,
            );

            if (itemIndex !== -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity -= 1;
                } else {
                    state.items.splice(itemIndex, 1);
                }
            }
        },

        removeFromCheckout: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.medicine.id !== action.payload,
            );
        },

        clearCheckout: (state) => {
            state.items = [];
        },

        hydrateCheckout: (state, action: PayloadAction<CheckoutItem[]>) => {
            state.items = action.payload;
        },
    },
});

export const {
    addToCheckout,
    removeOneFromCheckout,
    removeFromCheckout,
    clearCheckout,
    hydrateCheckout,
} = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
