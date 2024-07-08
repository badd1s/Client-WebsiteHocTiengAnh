import React from 'react';
import Grammar from './Grammar';
import usePagination from '../../hooks/usePagination';
const GrammarFeed = ({ listGram }) => {
    const itemsPerPage = 5;
    const {
        currentPage,
        totalPages,
        currentData,
        goToPage,
        goToFirst,
        goToEnd
    } = usePagination(listGram, itemsPerPage);
    return (
        <>
            <div>
                {currentData.map((listGrammar) => (
                    <Grammar key={listGrammar._id} val={listGrammar} />
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

export default GrammarFeed;