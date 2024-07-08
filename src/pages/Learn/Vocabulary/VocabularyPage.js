import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import DataContext from '../../../context/DataContext';
import axios from '../../../api/axios';
import Loading from '../../../components/system/Loading';
import ListVocabFeed from '../../../components/vocabulary/ListVocabFeed';

const VocabularyPage = () => {
    // Data List
    const { listVocab } = useContext(DataContext);

    // lấy id từ URL
    const { id } = useParams();
    const lists = listVocab.find(val => (val._id).toString() === id);

    // Get Data Vocabulary
    const [vocab, setVocab] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        lists &&
            axios.get(`/vocabularyList/${lists.collectionName}`).then((res) => {
                console.log("Get data success");
                setVocab(res.data);
                setLoading(false);
            });
    }, [lists]);

    if (loading) {
        return (
            <>
                <Loading />
            </>
        )
    }

    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 p-5'>
                    {lists ? (
                        <>
                            <div className='row'>
                                <div className='col-md-3 mb-4'>
                                    <div className='card shadow-sm'>
                                        <h5 className='card-title my-2 text-center'>Danh Sách Chủ Đề</h5>
                                        <div className='card-body'>
                                            {listVocab.length ? <ListVocabFeed listVocab={listVocab} /> : <p>Không có chủ đề nào.</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-9'>
                                    <div className='card shadow-sm'>
                                        <p className='card-title fs-3 text-center text-primary'>{lists.title}</p>
                                        <div className='card-body'>
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Từ Vựng</th>
                                                            <th>Loại Từ</th>
                                                            <th>Phát Âm</th>
                                                            <th>Nghĩa</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {vocab.map(val => (
                                                            <tr key={val._id}>
                                                                <td>{val.vocabulary}</td>
                                                                <td>{val.type}</td>
                                                                <td>{val.pronunciation}</td>
                                                                <td>{val.meaning}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <p className='d-flex justify-content-end'> {lists.datetime}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>Không tìm thấy chủ đề từ vựng nào</h2>
                            <p>
                                <Link to='/listVocabulary'>Quay về trang Từ Vựng</Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default VocabularyPage
