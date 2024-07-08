import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import AuthContext from "../../context/AuthContext";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [persist] = useLocalStorage('persist', false);
    const { token, setToken } = useContext(AuthContext);
    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                const newToken = await refresh();
                if (token !== "") setToken(newToken);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;

    }, [auth?.accessToken, refresh, setToken, token])



    return (
        <>
            {!persist
                ? < Outlet />
                : isLoading
                    ? <>
                        <div className="container-fluid bg-light">
                            <div className="container bg-white min-vh-100 p-5">
                                <p className="fw-bolder text-center fs-3">Loading...</p>
                            </div>
                        </div>
                    </>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;