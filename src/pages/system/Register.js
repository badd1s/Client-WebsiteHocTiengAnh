import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?=*&]).{8,}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setSuccess(false);
            setMsg("Mật khẩu không được giống tài khoản");
            return;
        }
        try {
            await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUser('');
            setPwd('');
            setMatchPwd('');
            setSuccess(true);
            setMsg("Đăng ký thành công")
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            if (!err?.response) {
                setMsg('Server không phản hồi');
            } else if (err.response?.status === 409) {
                setMsg('Tên tài khoản đã có người sử dụng');
            } else {
                setMsg('Đăng ký thất bại')
            }

            setSuccess(false);

        }
    }

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center bg-light">
                <div className="container bg-white min-vh-100 py-5">
                    <div className='bg-white rounded py-4'>
                        <h1 className="text-center py-5">Đăng Ký</h1>
                        <form className='' onSubmit={handleSubmit}>
                            <div className="mb-3 col-md-5 mx-auto">
                                <label htmlFor="username" className="mb-3 form-label">Tên Đăng Nhập:
                                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    className="form-control"
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    aria-describedby="passwordHelp"
                                />
                                <p id="usernameHelp" className={userFocus && user && !validName ? "form-text" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Phải bắt đầu bằng chữ. Tối thiểu 3 ký tự.<br />
                                </p>
                            </div>
                            <div className="mb-3 col-md-5 mx-auto">
                                <label htmlFor="password" className="mb-3 form-label"> Mật Khẩu:
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="password"
                                    id="new-password"
                                    className="form-control"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    autoComplete="new-password"
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="passwordHelp"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="passwordHelp" className={pwdFocus && !validPwd ? "form-text" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Tối thiểu 8 ký tự.
                                    Phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.<br />
                                </p>
                            </div>
                            <div className="mb-3 col-md-5 mx-auto">
                                <label htmlFor="confirm_pwd" className="mb-3 form-label">
                                    Nhập Lại Mật Khẩu:
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    className="form-control"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    autoComplete="new-password"
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="pwdConfirm"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="pwdConfirm" className={matchFocus && !validMatch ? "form-text" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Phải khớp với mật khẩu.
                                </p>
                                <div className='text-center'>
                                    <p className='py-3'>
                                        <button type="submit" className="btn btn-primary" disabled={!validName || !validPwd || !validMatch ? true : false}>Đăng Ký</button>
                                    </p>
                                </div>
                            </div>
                            <div className='text-center'>
                                <p className='py-1'>
                                    Đã có tài khoản ?
                                    <Link to="/login" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'> Đăng Nhập</Link>
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
            </div>

        </>
    )
}

export default Register