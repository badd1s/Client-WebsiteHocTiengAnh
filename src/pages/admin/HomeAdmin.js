import React from 'react';
import Navbar from '../../components/admin/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import usePagination from '../../hooks/usePagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
const HomeAdmin = () => {

    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const [searchUserResult, setSearchUserResult] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    // Lấy danh sách người dùng
    useEffect(() => {
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal,
                });

                console.log(response.data);
                setUsers(response.data);
                setSearchUserResult(response.data);
            } catch (err) {
                if (err.name !== "CanceledError") {
                    navigate('/login', { state: { from: location }, replace: true });
                    console.log('error:', err)
                }

            }
        }

        getUsers();

        return () => {
            controller.abort();
        };

    }, [axiosPrivate, location, navigate]);

    //Tìm kiếm người dùng
    useEffect(() => {
        const filterResults = users.filter(val => {
            const username = val.username ? val.username.toLowerCase() : '';
            const id = val._id ? val._id.toLowerCase() : '';
            return id.includes(searchUser.toLowerCase()) || username.includes(searchUser.toLowerCase());
        });

        setSearchUserResult(filterResults.reverse());
    }, [users, searchUser])

    const { currentPage, totalPages, currentData, goToPage, goToFirst, goToEnd } = usePagination(searchUserResult, 10);

    // Xoá người dùng
    const handleDelete = async (userId) => {
        try {
            await axiosPrivate.delete('/users', {
                data: { userId } // Truyền userId qua body
            });
            const updatedList = users.filter(user => user._id !== userId);
            setUsers(updatedList);
            setSuccess(true);
            setMessage('Xoá Thành Công');
        } catch (err) {
            setSuccess(false);
            setMessage('Xoá Thất Bại');
            console.log('Error:', err);
        }
    }


    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 px-0'>
                    <Navbar />
                    <div>
                        <h4 className='text-center mt-2'>Danh sách người dùng</h4>
                        <div className='d-flex row'>
                            <div className='col-md-5 mx-auto'>
                                <h5>Tổng số người dùng: {users.length}</h5>
                            </div>
                            <div className='col-md-5 mx-auto'>
                                <form className="searchForm mx-auto mb-3">
                                    <div className="input-group">
                                        <input
                                            id="searchUser"
                                            type="text"
                                            value={searchUser}
                                            onChange={(e) => setSearchUser(e.target.value)}
                                            className='form-control rounded-start'
                                            placeholder='Tìm kiếm...'
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        {searchUserResult?.length
                            ? (
                                <>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Tên đăng nhập</th>
                                                    <th>Tên</th>
                                                    <th>Vai trò</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentData.map((user) => (
                                                    <tr key={user._id}>
                                                        <td>{user._id}</td>
                                                        <td>{user.username}</td>
                                                        <td>{user.name}</td>
                                                        {user.roles.Admin
                                                            ? <td> Admin</td>
                                                            : <td> User</td>
                                                        }
                                                        <td>
                                                            <button
                                                                className='btn btn-danger btn-sm'
                                                                onClick={() => handleDelete(user._id)}
                                                            >Xoá</button>
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
                            ) : <h5 className='text-center'>Không có người dùng nào</h5>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomeAdmin