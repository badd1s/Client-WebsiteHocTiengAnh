import React from 'react';
import Vocabulary from './Vocabulary';
import usePagination from '../../hooks/usePagination';
const VocabularyFeed = ({ listVocab }) => {
    const itemsPerPage = 6;
    const {
        currentPage,
        totalPages,
        currentData,
        goToPage,
        goToFirst,
        goToEnd
    } = usePagination(listVocab, itemsPerPage);
    return (
        <>
            <div>
                {currentData.map((listVocabulary) => (
                    <Vocabulary key={listVocabulary._id} val={listVocabulary} />
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

export default VocabularyFeed;