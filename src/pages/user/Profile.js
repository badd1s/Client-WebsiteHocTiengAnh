import React, { useContext } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthContext";
import DisplayNameForm from "../../components/profile/DisplayNameForm";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";

const Profile = () => {
    const axiosPrivate = useAxiosPrivate();
    const { userLogin } = useContext(AuthContext);

    return (
        <div className='container-fluid d-flex align-items-center justify-content-center bg-light'>
            <div className='container bg-white py-5 min-vh-100'>
                <div className='bg-white rounded py-4'>
                    <h1 className='text-center py-5'>Thông Tin Tài Khoản</h1>
                    <div className="row d-flex">
                        <div className="col-md-6 border-end">
                            <DisplayNameForm userLogin={userLogin} axiosPrivate={axiosPrivate} />
                        </div>
                        <div className="col-md-6">
                            <ChangePasswordForm userLogin={userLogin} axiosPrivate={axiosPrivate} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
