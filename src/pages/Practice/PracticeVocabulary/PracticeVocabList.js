import React from 'react'
import PracticeVocabFeed from '../../../components/practice/practiceVocab/PracticeVocabFeed';
import { useContext } from 'react';
import DataContext from '../../../context/DataContext';

const PracticeVocabList = () => {
    const { listVocab, fetchErrorListVocab, isLoadingListVocab } = useContext(DataContext);

    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 p-5'>
                    <p className="fs-3 text-center text-primary pb-3">
                        Ôn Tập Từ Vựng
                    </p>
                    {isLoadingListVocab && <p>Đang tải ...</p>}
                    {!isLoadingListVocab && fetchErrorListVocab && <p >{fetchErrorListVocab}</p>}
                    {!isLoadingListVocab && !fetchErrorListVocab && (listVocab.length ? < PracticeVocabFeed listVocab={listVocab} /> : <p>Không có bài ôn tập từ vựng nào.</p>
                    )}
                </div>
            </div>
        </ >
    )
}

export default PracticeVocabList;