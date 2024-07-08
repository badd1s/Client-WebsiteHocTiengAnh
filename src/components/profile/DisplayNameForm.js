import React, { useContext, useRef, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
const DisplayNameForm = ({ userLogin, axiosPrivate }) => {
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState('');
    const editNameRef = useRef(userLogin.name);
    const { userAvatar } = useContext(AuthContext);

    const handleEditName = async (id) => {
        const newName = { name: editNameRef.current.value };
        try {
            await axiosPrivate.put(`/users/${id}`, newName);
            setSuccess(true);
            setMessage('Đổi Tên Thành Công');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            setSuccess(false);
            setMessage('Đổi Tên Thất Bại');
            console.log(`Error: ${err.message}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditName(userLogin._id);
    };

    return (
        <div className="mb-3 mx-auto col-md-10 d-flex row">
            <div className="col-md-4">
                <img
                    src={userAvatar}
                    className="card-img bg-primary-subtle rounded-3"
                    alt="Avatar"
                />
            </div>
            <div className="col-md-8">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="display-name" className="form-label">
                        Tên Hiển Thị
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="display-name"
                        ref={editNameRef}
                        defaultValue={userLogin.name}
                    />
                    <div className="text-center">
                        <button type="submit" className="mt-3 btn btn-primary">
                            Xác Nhận
                        </button>
                    </div>
                </form>
            </div>

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
                                setMessage('');
                                setSuccess(null);
                            }}></button>
                        </div>
                        <div className="modal-body">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayNameForm;
