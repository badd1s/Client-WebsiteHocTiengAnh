import { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-info-subtle shadow-sm rounded">
                <div className="container-fluid">
                    <Link className="text-primary display-6 fw-medium navbar-brand" to="/admin">Quản Lý</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <div className="navbar-nav mx-auto nav-tabs">
                            <Link
                                reloadDocument
                                className={`nav-link nav-item ${activeLink === '/admin' ? 'active' : ''}`}
                                aria-current='page'
                                to="/admin"
                            >
                                Người Dùng
                            </Link>
                            <Link
                                reloadDocument
                                className={`nav-link nav-item ${activeLink === '/admin/vocabulary' ? 'active' : ''}`}
                                aria-current='page'
                                to="/admin/vocabulary"
                            >
                                Từ Vựng và Ôn tập Từ Vựng
                            </Link>
                            <Link
                                reloadDocument
                                className={`nav-link nav-item ${activeLink === '/admin/grammar' ? 'active' : ''}`}
                                aria-current='page'
                                to="/admin/grammar"
                            >
                                Ngữ Pháp
                            </Link>
                            <Link
                                reloadDocument
                                className={`nav-link nav-item ${activeLink === '/admin/listPracticeGrammar' ? 'active' : ''}`}
                                aria-current='page'
                                to="/admin/listPracticeGrammar"
                            >
                                Ôn Tập Ngữ Pháp
                            </Link>
                            <Link
                                reloadDocument
                                className={`nav-link nav-item ${activeLink === '/admin/homePost' ? 'active' : ''}`}
                                aria-current='page'
                                to="/admin/homePost"
                            >
                                Diễn Đàn
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar