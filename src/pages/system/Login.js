import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';
import axios from '../../api/axios';
import { jwtDecode } from "jwt-decode";
import AuthContext from '../../context/AuthContext';
import ROLES from '../../config/Roles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const userRef = useRef();
    const [success, setSuccess] = useState(null);

    const [user, resetUser, userAttribule] = useInput('user', '');
    const [pwd, setPwd] = useState('');
    const [msg, setMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    const { setUserId, setToken, setIsLoggedIn, setUserAvatar } = useContext(AuthContext);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const decoded = jwtDecode(accessToken);
            const userId = decoded.UserInfo.id;
            const userAvatar = decoded.UserInfo.avatar;
            const userRoles = decoded.UserInfo.roles;
            setUserId(userId);
            setToken(accessToken);
            setUserAvatar(userAvatar);
            setAuth({ user, accessToken });
            setIsLoggedIn(true);
            setSuccess(true);
            setMsg('Đăng nhập thành công');
            resetUser();
            setPwd('');

            //Check admin
            const isAdmin = userRoles.includes(ROLES.Admin);
            const path = isAdmin ? "/admin" : "/";

            setTimeout(() => {
                navigate(path, { replace: true });
                window.location.reload();
            }, 1000);

        } catch (err) {
            if (!err?.response) {
                setMsg('Server không phản hồi');
            } else if (err.response?.status === 401) {
                setMsg('Sai tài khoản hoặc mật khẩu');
            } else {
                setMsg('Đăng nhập thất bại');
            }
            setSuccess(false);
        }
    }

    return (
        <>
            <div className='container-fluid d-flex align-items-center justify-content-center bg-light '>
                <div className='container bg-body py-5 min-vh-100'>
                    <div className='bg-white rounded py-4'>
                        <h1 className='text-center py-5'>Đăng Nhập</h1>
                        <form className='my-3' onSubmit={handleSubmit}>
                            <div className="mb-3 col-md-5 mx-auto">
                                <label htmlFor="username" className="mb-3 form-label">Tên Đăng Nhập:</label>
                                <input
                                    type="text"
                                    className=" form-control"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="username"
                                    {...userAttribule}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-5 mx-auto">
                                <label htmlFor="password" className="mb-3 form-label">Mật Khẩu:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-5 form-check mx-auto">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id='persist'
                                    onChange={toggleCheck}
                                    checked={check}
                                    required
                                />
                                <label className="form-check-label" htmlFor="persist">Xác Nhận Đăng Nhập</label>
                            </div>
                            <div className='text-center'>
                                <button type="submit" className=" btn btn-primary">Đăng Nhập</button>
                                <p className='py-5'>
                                    Bạn chưa có tài khoản ?
                                    <Link reloadDocument to="/register" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>Đăng Ký</Link>
                                </p>
                            </div>

                        </form>

                        {/* Modal thông báo thành công hoặc thất bại */}
                        <div className={`modal fade ${success !== null ? 'show d-block' : ''}`} tabIndex="-1" aria-labelledby="statusModalLabel" aria-hidden={success === null}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {success ? (
                                            <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" size="2x" />
                                        ) : (
                                            <FontAwesomeIcon icon={faTimesCircle} className="me-2 text-danger" size="2x" />
                                        )}
                                        <h5 className="modal-title" id="statusModalLabel">Thông báo</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                            setMsg('');
                                            setSuccess(null);
                                        }}></button>
                                    </div>
                                    <div className="modal-body">
                                        {msg}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Login