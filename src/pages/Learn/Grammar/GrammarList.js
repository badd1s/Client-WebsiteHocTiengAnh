import React from 'react'
import GrammarFeed from '../../../components/grammar/GrammarFeed';
import { useContext } from 'react';
import DataContext from '../../../context/DataContext';

const GrammarList = () => {
    const { listGram, fetchErrorListGram, isLoadingListGram } = useContext(DataContext);
    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 p-5'>
                    <p className="fs-3 card-title text-center text-primary pb-3">
                        Ngữ Pháp
                    </p>
                    <div className='card-body'>
                        {isLoadingListGram && <p>Đang tải ...</p>}
                        {!isLoadingListGram && fetchErrorListGram && <p >{fetchErrorListGram}</p>}
                        {!isLoadingListGram && !fetchErrorListGram && (listGram.length ? <GrammarFeed listGram={listGram} /> : <p>Không có bài học ngữ pháp nào.</p>)}
                    </div>
                </div>
            </div>
        </ >
    )
}

export default GrammarList;