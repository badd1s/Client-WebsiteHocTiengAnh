import useAuth from "./useAuth";
import axios from "../api/axios";
const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        try {
            // eslint-disable-next-line
            await axios.get('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
        setAuth({});

    }

    return logout;
}

export default useLogout;