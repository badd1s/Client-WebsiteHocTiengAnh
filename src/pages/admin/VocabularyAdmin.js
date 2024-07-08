import React from 'react';
import Navbar from '../../components/admin/Navbar';
import { useContext, useState } from 'react';
import DataContext from '../../context/DataContext';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import usePagination from '../../hooks/usePagination';
import NewVocabulary from '../../components/admin/vocabulary/NewVocabulary';
import VocabularyEdit from '../../components/admin/vocabulary/VocabularyEdit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthContext';
const VocabularyAdmin = () => {
    const { userLogin } = useContext(AuthContext);
    const userId = userLogin._id;
    const { listVocab, setListVocab, search, setSearch, searchVocabResult } = useContext(DataContext);
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState('');

    const { currentPage, totalPages, currentData, goToPage, goToFirst, goToEnd } = usePagination(searchVocabResult, 5);

    // Xóa chủ đề ở danh sách
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/listVocabulary/${id}`);
            const updatedList = listVocab.filter(val => val._id !== id);
            setListVocab(updatedList);
            setSuccess(true);
            setMessage("Xoá Thành Công");
        } catch (err) {
            setSuccess(false);
            setMessage("Xoá Thất Bại");
            console.log(`Error: ${err.message}`);
        }
    }

    //Xóa nội dung của chủ đề
    const handleDeleteVocabulary = async (collectionName) => {
        try {
            await axios.delete(`/vocabularyList/${collectionName}`);
            console.log('Xóa thành công');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 px-0'>
                    <Navbar />

                    {/* Danh sách chủ đề */}
                    <div>
                        <h4 className='text-center mt-2'>Danh sách chủ đề từ vựng</h4>
                        <div className='d-flex row'>
                            <div className='col-md-5 mx-auto'>
                                <h5>Tổng số chủ đề từ vựng: {listVocab.length}</h5>
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
                        {searchVocabResult?.length
                            ? (
                                <>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>Tên bài</th>
                                                    <th>Tên dữ liệu</th>
                                                    <th>Ngày cập nhật</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentData.map((val) => (
                                                    <tr key={val._id}>
                                                        <td>{val.title}</td>
                                                        <td>{val.collectionName}</td>
                                                        <td>{val.datetime} </td>
                                                        <td>
                                                            {/* Xem chủ đề */}
                                                            <Link reloadDocument to={`/listVocabulary/${val._id}`} className='btn btn-success my-1 mx-1 btn-sm'>
                                                                Xem
                                                            </Link>

                                                            {/* Sửa chủ đề */}
                                                            <button
                                                                type='button'
                                                                className='btn btn-warning my-1 mx-1 btn-sm'
                                                                data-bs-toggle="modal"
                                                                data-bs-target={`#edit-vocabulary-${val._id}`}
                                                            >
                                                                Sửa
                                                            </button>
                                                            <div className="modal fade" id={`edit-vocabulary-${val._id}`} tabIndex="-1" aria-labelledby={`vocabulary-${val._id}`} aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h1 className="modal-title fs-5" id={`vocabulary-${val._id}`}>Sửa chủ đề từ vựng</h1>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <VocabularyEdit id={val._id} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Xoá chủ đề */}
                                                            <button
                                                                className='btn btn-danger my-1 mx-1 btn-sm '
                                                                onClick={() => {
                                                                    handleDelete(val._id)
                                                                    handleDeleteVocabulary(val.collectionName);
                                                                }}>
                                                                Xoá
                                                            </button>

                                                            {/* Xem bài ôn tập chủ đề */}
                                                            <Link reloadDocument to={`/listPracticeVocab/${userId}/${val._id}`} className='btn btn-primary my-1 mx-1 btn-sm'>
                                                                Xem
                                                            </Link>
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
                            ) : <h5 className='text-center'>Không có chủ đề từ vựng nào</h5>
                        }
                    </div>

                    {/* Thêm chủ đề */}
                    <NewVocabulary />
                </div>
            </div>
        </>
    )
}

export default VocabularyAdmin