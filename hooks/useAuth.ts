import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../store/slices/authSlice";
import { useEffect } from "react";
import { RootState } from "../store/index";

const useAuth = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setCredentials({ user: data.user }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("Error fetching user session:", error);
                dispatch(logout());
            }
        };

        // Only fetch if we don't have a user in state
        if (!user && typeof window !== 'undefined') {
            fetchUserSession();
        }
    }, [dispatch, user]);

    return { user };
};

export default useAuth;
