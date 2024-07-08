import React from 'react';
import Post from './Post';
import usePagination from '../../hooks/usePagination';

const Feed = ({ post }) => {
    const itemsPerPage = 10;
    const {
        currentPage,
        totalPages,
        currentData,
        goToPage,
        goToFirst,
        goToEnd
    } = usePagination(post, itemsPerPage);

    return (
        <>
            <div>
                {currentData.map((post) => (
                    <Post key={post._id} val={post} />
                ))}
                <nav>
                    <ul className="pagination d-flex justify-content-center">
                        {currentPage > 1 && (
                            <li className='page-item'>
                                <button type="button" onClick={goToFirst} className='page-link'>
                                    &laquo;
                                </button>
                            </li>
                        )}

                        {[...Array(totalPages).keys()].map((number) => (
                            <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                                <button
                                    type="button"
                                    onClick={() => goToPage(number + 1)}
                                    className='page-link'
                                >
                                    {number + 1}
                                </button>
                            </li>

                        ))}
                        {currentPage < totalPages && (
                            <li className='page-item'>
                                <button type="button" onClick={goToEnd} className='page-link'>
                                    &raquo;
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Feed;