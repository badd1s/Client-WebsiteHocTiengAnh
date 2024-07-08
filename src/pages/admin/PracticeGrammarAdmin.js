import React from 'react';
import Navbar from '../../components/admin/Navbar';
import DataContext from '../../context/DataContext';
import { useContext, useState } from 'react';
import usePagination from '../../hooks/usePagination';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import NewPracticeGrammar from '../../components/admin/practice/NewPracticeGrammar';
import PracticeGrammarEdit from '../../components/admin/practice/PracticeGrammarEdit';
const PracticeGrammarAdmin = () => {
    const { listPracGram, setListPracGram, search, setSearch, searchPracGramResult } = useContext(DataContext);
    const { userLogin } = useContext(AuthContext);
    const userId = userLogin._id;
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState('');

    // Phân trang
    const { currentPage, totalPages, currentData, goToPage, goToFirst, goToEnd } = usePagination(searchPracGramResult, 5);

    // Xóa bài ôn tập ngữ pháp ở danh sách
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/listPracticeGrammar/${id}`);
            const updatedList = listPracGram.filter(val => val._id !== id);
            setListPracGram(updatedList);
            setSuccess(true);
            setMessage("Xoá Thành Công");
        } catch (err) {
            setSuccess(false);
            setMessage("Xoá Thất Bại");
            console.log(`Error: ${err.message}`);
        }
    };

    // Xóa nội dung bài ôn tập ngữ pháp
    const handleDeletePracticeGrammar = async (collectionName) => {
        try {
            await axios.delete(`/practiceGrammar/${collectionName}`);
            console.log('Xóa thành công');
        } catch (err) {
            console.log(`Lỗi: ${err.message}`);
        }
    };

    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 px-0'>
                    <Navbar />

                    {/* Danh sách bài ôn tập */}
                    <div>
                        <h4 className='text-center mt-2'>Danh sách bài ôn tập ngữ pháp</h4>
                        <div className='d-flex row'>
                            <div className='col-md-5 mx-auto'>
                                <h5>Tổng số bài ôn tập ngữ pháp: {listPracGram.length} </h5>
                            </div>
                            <div className='col-md-5 mx-auto'>
                                <form className="searchForm mx-auto mb-3">
                                    <div className="input-group">
                                        <input
                                            id="searchUser"
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
                        {searchPracGramResult?.length
                            ? (
                                <>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>Tên bài</th>
                                                    <th>Tóm tắt</th>
                                                    <th>Tên dữ liệu</th>
                                                    <th>Ngày cập nhật</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentData.map((val) => (
                                                    <tr key={val._id}>
                                                        <td>{val.title}</td>
                                                        <td>{val.body}</td>
                                                        <td>{val.collectionName}</td>
                                                        <td>{val.datetime} </td>
                                                        <td>
                                                            {/* Xem */}
                                                            <Link to={`/listPracticeGram/${userId}/${val._id}`} className='btn btn-success my-1 mx-1 btn-sm'>
                                                                Xem
                                                            </Link>

                                                            {/* Sửa */}
                                                            <button
                                                                type='button'
                                                                className='btn btn-warning my-1 mx-1 btn-sm'
                                                                data-bs-toggle="modal"
                                                                data-bs-target={`#edit-practicegrammar-${val._id}`}
                                                            >
                                                                Sửa
                                                            </button>
                                                            <div className="modal fade" id={`edit-practicegrammar-${val._id}`} tabIndex="-1" aria-labelledby={`practicegrammar-${val._id}`} aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h1 className="modal-title fs-5" id={`practicegrammar-${val._id}`}>Sửa bài ôn tập ngữ pháp</h1>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <PracticeGrammarEdit id={val._id} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Xoá */}
                                                            <button
                                                                className='btn btn-danger my-1 mx-1 btn-sm '
                                                                onClick={() => {
                                                                    handleDelete(val._id)
                                                                    handleDeletePracticeGrammar(val.collectionName);
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
                            ) : <h5 className='text-center'>Không có bài ôn tập nào</h5>
                        }
                    </div>

                    {/* Thêm bài ôn tập ngữ pháp */}
                    <NewPracticeGrammar />
                </div>
            </div>
        </>
    )
}

export default PracticeGrammarAdmin;