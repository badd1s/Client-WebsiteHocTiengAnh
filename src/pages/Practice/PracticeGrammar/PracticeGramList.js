import React from 'react'
import PracticeGramFeed from '../../../components/practice/practiceGram/PracticeGramFeed';
import { useContext } from 'react';
import DataContext from '../../../context/DataContext';

const PracticeGramList = () => {
    const { listPracGram, fetchErrorListPracGram, isLoadingListPracGram } = useContext(DataContext);

    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 p-5'>
                    <p className="fs-3 text-center text-primary pb-3">
                        Ôn Tập Ngữ Pháp
                    </p>
                    {isLoadingListPracGram && <p>Đang tải ...</p>}
                    {!isLoadingListPracGram && fetchErrorListPracGram && <p >{fetchErrorListPracGram}</p>}
                    {!isLoadingListPracGram && !fetchErrorListPracGram && (listPracGram.length ? < PracticeGramFeed listPracGram={listPracGram} /> : <p>Không có bài ôn tập từ vựng nào.</p>
                    )}
                </div>
            </div>
        </ >
    )
}

export default PracticeGramList;