import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Feed from '../../components/forum/Feed';
import DataContext from '../../context/DataContext';

const HomePost = () => {
    const { searchResult, search, setSearch, fetchErrorForum, isLoadingForum } = useContext(DataContext);

    return (
        <div className='container-fluid bg-light'>
            <div className='container bg-white min-vh-100 p-5'>
                <h2 className="fs-3 text-center text-primary pb-3">Diễn Đàn</h2>
                <div className='row'>
                    <div className='col-md-10'>
                        <form className="searchForm mx-auto mb-3">
                            <div className="input-group">
                                <input
                                    id="search"
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className='form-control rounded-start'
                                    placeholder='Tìm kiếm...'
                                />
                            </div>
                        </form>
                    </div>
                    <div className='col-md-2'>
                        <Link reloadDocument className='btn btn-info fw-bold col-12 mb-3' to='/newPost'>Đăng bài mới</Link>
                    </div>
                </div>
                <div>
                    {isLoadingForum && <p>Đang tải...</p>}
                    {!isLoadingForum && fetchErrorForum && <p className="text-danger">{fetchErrorForum}</p>}
                    {!isLoadingForum && !fetchErrorForum && (
                        searchResult.length ? <Feed post={searchResult} /> : <p>Không có bài viết nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePost;
