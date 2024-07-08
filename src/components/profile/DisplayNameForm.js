import React, { useContext, useRef } from 'react';
import AuthContext from '../../context/AuthContext';

const DisplayNameForm = ({ userLogin, axiosPrivate }) => {
    const editNameRef = useRef(userLogin.name);
    const { userAvatar } = useContext(AuthContext);

    const handleEditName = async (id) => {
        const newName = { name: editNameRef.current.value };
        try {
            await axiosPrivate.put(`/users/${id}`, newName);
            console.log('Edit User success');
        } catch (err) {
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
        </div>
    );
};

export default DisplayNameForm;
