import React, { useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?=*&]).{8,}$/;

const ChangePasswordForm = ({ axiosPrivate, userLogin }) => {
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [success, setSuccess] = useState(false);
    const [success2, setSuccess2] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(newPwd));
        setValidMatch(newPwd === matchPwd);
    }, [newPwd, matchPwd]);

    const handleEditPassword = async () => {
        const pwd = PWD_REGEX.test(newPwd);
        if (!pwd) {
            return;
        }

        try {
            await axiosPrivate.put(`/changePwd`, JSON.stringify({ user: userLogin.username, oldPwd, newPwd }));
            setSuccess(true);
            setSuccess2(true);
            setMessage('Đổi Mật Khẩu Thành Công');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            setSuccess2(false);
            setMessage('Đổi Mật Khẩu Thất Bại');
            console.log(`Error: ${err.message}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditPassword();
    };

    useEffect(() => {
        if (success) {
            setOldPwd('');
            setNewPwd('');
            setMatchPwd('');
            setSuccess(false);
        }
    }, [success]);

    return (
        <form onSubmit={handleSubmit}>
            <p className="text-center fw-bolder fs-5 mb-5">Đổi Mật Khẩu</p>
            <div className="mb-3 col-md-10 mx-auto">
                <label htmlFor="old-password" className="form-label">
                    Mật Khẩu Hiện Tại
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="old-password"
                    onChange={(e) => setOldPwd(e.target.value)}
                    value={oldPwd}
                    required
                />
            </div>
            <div className="mb-3 col-md-10 mx-auto">
                <label htmlFor="new-password" className="form-label">
                    Mật Khẩu Mới
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !newPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="new-password"
                    onChange={(e) => setNewPwd(e.target.value)}
                    value={newPwd}
                    required
                    aria-describedby="passwordHelp"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="passwordHelp" className={pwdFocus && !validPwd ? 'form-text' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Tối thiểu 8 ký tự. Phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                </p>
            </div>
            <div className="mb-4 col-md-10 mx-auto">
                <label htmlFor="confirm_pwd" className="form-label">
                    Xác Nhận Mật Khẩu Mới
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-describedby="pwdConfirm"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="pwdConfirm" className={matchFocus && !validMatch ? 'form-text' : 'offscreen'}>
                    Phải khớp với mật khẩu.
                </p>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-primary">
                    Xác Nhận
                </button>
            </div>
            {/* Modal thông báo thành công hoặc thất bại */}
            <div className={`modal fade ${success2 !== null ? 'show d-block' : ''}`} tabIndex="-1" aria-labelledby="statusModalLabel" aria-hidden={success2 === null}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {success2 ? (
                                <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" size="2x" />
                            ) : (
                                <FontAwesomeIcon icon={faTimesCircle} className="me-2 text-danger" size="2x" />
                            )}
                            <h5 className="modal-title" id="statusModalLabel">Thông báo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                setMessage('');
                                setSuccess2(null);
                            }}></button>
                        </div>
                        <div className="modal-body">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </form>


    );
};

export default ChangePasswordForm;
