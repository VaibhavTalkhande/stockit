import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../store/slices/authSlice";
import { useEffect, useState } from "react";
import { RootState } from "../store/index";

const useAuth = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setCredentials({ user: data.data.user }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        if (!user) {
            fetchUserSession();
        } else {
            setLoading(false);
        }
    }, [dispatch, user]);

    return { user, loading };
};

export default useAuth;
