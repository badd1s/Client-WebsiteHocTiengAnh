import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import AuthContext from "../context/AuthContext";
import ROLES from "../config/Roles";
const Header = () => {

    // Đăng xuất
    const navigate = useNavigate();
    const logout = useLogout();

    const { userLogin, isLoggedIn, setIsLoggedIn, setUserId, setToken, userAvatar, setUserAvatar } = useContext(AuthContext);
    const userId = userLogin ? userLogin._id : "";
    const userRole = userLogin ? userLogin.roles : null;

    const signOut = async () => {
        console.log('Signing out...');
        await logout();
        setUserId('');
        setToken('');
        setUserAvatar('');
        setIsLoggedIn(false);
        navigate('/', { replace: true });
        window.location.reload();
    };
    // Hiển thị nếu đã đăng nhập
    const authLinks = (
        <>
            <div className="nav-item dropdown">
                <img
                    src={userAvatar}
                    className="fixed-avatar nav-link dropdown-toggle rounded-circle bg-primary-subtle shadow-sm"
                    alt="Avatar"
                    data-bs-toggle="dropdown"
                />
                <div className="dropdown-menu bg-info-subtle">
                    <Link to={`/profile/${userId}`} className="dropdown-item">
                        Cập nhật thông tin
                    </Link>
                    <Link
                        className="dropdown-item"
                        onClick={signOut}
                    > Đăng xuất</Link>
                </div>
            </div>
        </>
    );

    //Hiển thị nếu chưa đăng nhập
    const guestLinks = (
        <>
            <Link

                to="/login"
                className="btn btn-primary shadow-sm rounded-5 mx-1 "
                type="button"
            >
                Đăng Nhập
            </Link>
            <Link

                to="/register"
                className="btn btn-primary shadow-sm rounded-5 mx-1 "
                type="button"
            >
                Đăng Ký
            </Link>
        </>
    )

    const handleLearnEnglishClick = () => {
        if (userRole && userRole.Admin === ROLES.Admin) {
            navigate("/admin");
            window.location.reload();
        } else {
            navigate("/");
            window.location.reload();
        }

    };

    return (
        <>
            <header>
                <div className="container-fluid shadow-sm sticky-top bg-white">
                    <div className="container px-0">
                        <nav className="navbar navbar-light navbar-expand-xl">
                            <Link className="navbar-brand" onClick={handleLearnEnglishClick}>
                                <h1 className="text-primary display-6 fw-medium">
                                    HỌC TIẾNG ANH
                                </h1>
                            </Link>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className="fw-medium collapse navbar-collapse mx-auto"
                                id="navbarSupportedContent"
                            >
                                <div className="navbar-nav mx-auto">
                                    <Link to="/" className="nav-link nav-item">
                                        TRANG CHỦ
                                    </Link>
                                    <div className="nav-item dropdown">
                                        <Link

                                            className="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            HỌC TẬP
                                        </Link>
                                        <div className="dropdown-menu bg-primary-subtle">
                                            <Link to="/alphabet" className="dropdown-item">
                                                BẢNG PHIÊN ÂM VÀ BẢNG CHỮ CÁI
                                            </Link>
                                            <Link to="/listVocabulary" className="dropdown-item">
                                                TỪ VỰNG
                                            </Link>
                                            <Link to="/listGrammar" className="dropdown-item">
                                                NGỮ PHÁP
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="nav-item dropdown">
                                        <Link

                                            className="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            ÔN TẬP
                                        </Link>
                                        <div className="dropdown-menu bg-primary-subtle">
                                            <Link to="/listPracticeVocab" className="dropdown-item">
                                                TỪ VỰNG
                                            </Link>
                                            <Link to="/listPracticeGram" className="dropdown-item">
                                                NGỮ PHÁP
                                            </Link>
                                        </div>
                                    </div>
                                    <Link to="/homePost" className="nav-link nav-item ">
                                        DIỄN ĐÀN
                                    </Link>
                                </div>
                                <div className="d-flex m-3 me-0" >
                                    {isLoggedIn
                                        ? authLinks
                                        : guestLinks
                                    }
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header >
        </>
    );
};

export default Header;
