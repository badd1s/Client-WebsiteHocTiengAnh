import { createContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useAxiosFetchUser from "../hooks/useAxiosFetchUser";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // Xác thực đăng nhập
    const [auth, setAuth] = useState('');

    const [userId, setUserId] = useLocalStorage('userId', "");
    const [token, setToken] = useLocalStorage('token', "");
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
    const [userAvatar, setUserAvatar] = useLocalStorage('userAvatar', "");

    const [userLogin, setUserLogin] = useState('');
    const { data: dataUser, fetchError: fetchErrorUser, isLoading: isLoadingUser } = useAxiosFetchUser(`/users/${userId}`);

    useEffect(() => {
        if (userId !== "") {
            setUserLogin(dataUser);
        }
    }, [userId, dataUser])

    return (
        <AuthContext.Provider value={{
            auth, setAuth, userLogin, fetchErrorUser, isLoadingUser,
            token, setToken, setUserId, isLoggedIn, setIsLoggedIn,
            userAvatar, setUserAvatar,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;