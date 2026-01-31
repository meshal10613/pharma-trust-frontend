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
        if (user) {
            dispatch(stopLoading());
            return;
        }

        const fetchUser = async () => {
            dispatch(startLoading());

            try {
                const { data } = await getUser();
                dispatch(setUser(data.user));
            } catch (error) {
                console.error("Profile fetch failed", error);
                dispatch(stopLoading());
            }
        };

        fetchUser();
    }, [dispatch, user]);
};

export default useLoadUser;
