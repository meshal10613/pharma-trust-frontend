"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUser, startLoading, stopLoading } from "../store/slice/userSlice";
import { getUser } from "../actions/user.action";

const useLoadUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (user) return;

        const fetchUser = async () => {
            dispatch(startLoading());

            try {
                const { data } = await getUser();
                if (data) {
                    dispatch(setUser(data.user));
                }
            } catch (error) {
                console.error("Profile fetch failed", error);
            } finally {
                dispatch(stopLoading());
            }
        };

        fetchUser();
    }, [user, dispatch]);
};

export default useLoadUser;
