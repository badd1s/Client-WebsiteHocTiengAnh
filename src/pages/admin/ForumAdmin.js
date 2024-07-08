import React, { useContext, useState } from 'react';
import Navbar from '../../components/admin/Navbar';
import DataContext from '../../context/DataContext';
import { Link } from 'react-router-dom';
import usePagination from '../../hooks/usePagination';
import axios from '../../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ForumAdmin = () => {
    const { post, setPost, setSearch, search, searchResultByAdmin } = useContext(DataContext);
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState('');

    // Phân trang
    const { currentPage, totalPages, currentData, goToPage, goToFirst, goToEnd } = usePagination(searchResultByAdmin, 10);

    // Delete post
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/homePost/${id}`);
            const updatedList = post.filter(val => val._id !== id);
            setPost(updatedList);
            setSuccess(true);
            setMessage('Xoá Thành Công');
        } catch (err) {
            setSuccess(false);
            setMessage('Xoá Thất Bại');
            console.log(`Error: ${err.message}`);
        }
    }

    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 px-0'>
                    <Navbar />

                    {/* Danh sách bài ngữ pháp */}
                    <div>
                        <h4 className='text-center mt-2'>Danh sách bài viết</h4>
                        <div className='d-flex row'>
                            <div className='col-md-5 mx-auto'>
                                <h5>Tổng số bài viết: {post.length}</h5>
                            </div>
                            <div className='col-md-5 mx-auto'>
                                <form className="searchForm mx-auto mb-3">
                                    <div className="input-group">
                                        <input
                                            id="searchPost"
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className='form-control rounded-start'
                                            placeholder='Tìm kiếm...'
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        {searchResultByAdmin?.length ? (
                            <>
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Tên bài viết</th>
                                                <th>Id tác giả</th>
                                                <th>Ngày đăng</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentData.map((val) => (
                                                <tr key={val._id}>
                                                    <td>{val.title}</td>
                                                    <td>{val.authorId}</td>
                                                    <td>{val.datetime} </td>
                                                    <td>
                                                        {/* Xem */}
                                                        <Link reloadDocument to={`/homePost/${val._id}`} className='btn btn-success my-1 mx-1 btn-sm'>
                                                            Xem
                                                        </Link>

                                                        {/* Xoá */}
                                                        <button
                                                            className='btn btn-danger my-1 mx-1 btn-sm '
                                                            onClick={() => {
                                                                handleDelete(val._id)
                                                            }}>
                                                            Xoá
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Phân trang */}
                                <nav className="my-3">
                                    <ul className="pagination justify-content-end">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => goToFirst()}>Đầu</button>
                                        </li>
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Trước</button>
                                        </li>
                                        <li className="page-item">
                                            <span className="page-link">{currentPage}/{totalPages}</span>
                                        </li>
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Tiếp</button>
                                        </li>
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => goToEnd()}>Cuối</button>
                                        </li>
                                    </ul>
                                </nav>

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
                            </>
                        ) : <h5 className='text-center'>Không có bài viết nào</h5>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForumAdmin;
