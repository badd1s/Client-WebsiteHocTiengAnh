import React from 'react'
import VocabularyFeed from '../../../components/vocabulary/VocabularyFeed';
import { useContext } from 'react';
import DataContext from '../../../context/DataContext';


const VocabularyList = () => {
    const { listVocab, fetchErrorListVocab, isLoadingListVocab } = useContext(DataContext);
    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 p-5'>
                    <p className="fs-3 text-center text-primary pb-3">
                        Từ Vựng
                    </p>
                    {isLoadingListVocab && <p>Đang tải ...</p>}
                    {!isLoadingListVocab && fetchErrorListVocab && <p >{fetchErrorListVocab}</p>}
                    {!isLoadingListVocab && !fetchErrorListVocab && (listVocab.length ? < VocabularyFeed listVocab={listVocab} /> : <p>Không có chủ đề từ vựng nào.</p>
                    )}
                </div>
            </div>
        </ >
    )
}

export default VocabularyList;