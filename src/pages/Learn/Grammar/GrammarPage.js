import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import DataContext from '../../../context/DataContext';
import axios from '../../../api/axios';
import Loading from '../../../components/system/Loading';
import ListGramFeed from '../../../components/grammar/ListGramFeed';
const GrammarPage = () => {
    // Data List
    const { listGram } = useContext(DataContext);

    // lấy id từ URL
    const { id } = useParams();
    const lists = listGram.find(val => (val._id).toString() === id);

    // Get Data Grammar
    const [grammar, setGrammar] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        lists &&
            axios.get(`/grammarList/${lists.collectionName}`).then((res) => {
                setGrammar(res.data);
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
                    {lists && (
                        <>
                            <div className='d-flex row'>
                                <div className='col-md-3'>
                                    <div className='card'>
                                        <h5 className='card-title my-2 text-center'>Danh Sách Bài Ngữ Pháp</h5>
                                        <div className='card-body'>
                                            {listGram.length ? <ListGramFeed listGram={listGram} /> : <p>Không có bài ngữ pháp nào.</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-9'>
                                    <div className='card'>
                                        <p className='card-title fs-3 text-center text-primary'>{lists.title}</p>
                                        <ol>
                                            <div className='card-body'>
                                                {grammar.map(val => (
                                                    <li key={val._id}>
                                                        {/* Tên, khái niệm */}
                                                        <span className="fw-bolder">{val.name}: </span>
                                                        {val.mean && (
                                                            <>
                                                                <span>{val.mean}</span>
                                                            </>
                                                        )}
                                                        <br />
                                                        {val.use_1 && (
                                                            <>
                                                                <span className='fw-bolder'>Cách dùng: </span>
                                                                <ul>
                                                                    <li className='list-item-1'>{val.use_1}</li>
                                                                    {val.use_2 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.use_2}</li>
                                                                        </>
                                                                    )}
                                                                    {val.use_3 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.use_3}</li>
                                                                        </>
                                                                    )}
                                                                    {val.use_4 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.use_4}</li>
                                                                        </>
                                                                    )}
                                                                    {val.use_5 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.use_5}</li>
                                                                        </>
                                                                    )}
                                                                    {val.use_6 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.use_6}</li>
                                                                        </>
                                                                    )}
                                                                </ul>
                                                            </>
                                                        )}
                                                        {val.classification_1 && (
                                                            <>
                                                                <span className='fw-bolder'>Phân loại: </span>
                                                                <ul>
                                                                    <li className='list-item-1'>{val.classification_1}</li>
                                                                    {val.classification_2 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.classification_2}</li>
                                                                        </>
                                                                    )}
                                                                    {val.classification_3 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.classification_3}</li>
                                                                        </>
                                                                    )}
                                                                    {val.classification_4 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.classification_4}</li>
                                                                        </>
                                                                    )}
                                                                    {val.classification_5 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.classification_5}</li>
                                                                        </>
                                                                    )}
                                                                    {val.classification_6 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.classification_6}</li>
                                                                        </>
                                                                    )}
                                                                </ul>
                                                            </>
                                                        )}
                                                        {val.structure_1 && (
                                                            <>
                                                                <span className='fw-bolder'>Cấu trúc: </span>
                                                                <ul className='list-group'>
                                                                    <li className='list-group-item'>{val.structure_1}</li>
                                                                    {val.structure_2 && (
                                                                        <>
                                                                            <li className='list-group-item'>{val.structure_2}</li>
                                                                        </>
                                                                    )}
                                                                    {val.structure_3 && (
                                                                        <>
                                                                            <li className='list-group-item'>{val.structure_3}</li>
                                                                        </>
                                                                    )}
                                                                    {val.structure_4 && (
                                                                        <>
                                                                            <li className='list-group-item'>{val.structure_4}</li>
                                                                        </>
                                                                    )}
                                                                    {val.structure_5 && (
                                                                        <>
                                                                            <li className='list-group-item'>{val.structure_5}</li>
                                                                        </>
                                                                    )}
                                                                    {val.structure_6 && (
                                                                        <>
                                                                            <li className='list-group-item'>{val.structure_6}</li>
                                                                        </>
                                                                    )}
                                                                    {val.structure_7 && (
                                                                        <>
                                                                            <li className='list-group-item'>{val.structure_7}</li>
                                                                        </>
                                                                    )}
                                                                </ul>
                                                            </>
                                                        )}

                                                        {val.example_1 && (
                                                            <>
                                                                <span className='fw-bolder'>Ví dụ: </span>
                                                                <ul>
                                                                    <li className='list-item-2'>{val.example_1}</li>
                                                                    {val.example_2 && (
                                                                        <>
                                                                            <li className='list-item-2'>{val.example_2}</li>
                                                                        </>
                                                                    )}
                                                                    {val.example_3 && (
                                                                        <>
                                                                            <li className='list-item-2'>{val.example_3}</li>
                                                                        </>
                                                                    )}
                                                                    {val.example_4 && (
                                                                        <>
                                                                            <li className='list-item-2'>{val.example_4}</li>
                                                                        </>
                                                                    )}
                                                                    {val.example_5 && (
                                                                        <>
                                                                            <li className='list-item-2'>{val.example_5}</li>
                                                                        </>
                                                                    )}
                                                                    {val.example_6 && (
                                                                        <>
                                                                            <li className='list-item-2'>{val.example_6}</li>
                                                                        </>
                                                                    )}
                                                                    {val.example_7 && (
                                                                        <>
                                                                            <li className='list-item-2'>{val.example_7}</li>
                                                                        </>
                                                                    )}
                                                                </ul>
                                                            </>
                                                        )}

                                                        {val.sign_1 && (
                                                            <>
                                                                <span className='fw-bolder'>Dấu hiệu nhận biết: </span>
                                                                <ul>
                                                                    <li className='list-item-1'>{val.sign_1}</li>
                                                                    {val.sign_2 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.sign_2}</li>
                                                                        </>
                                                                    )}
                                                                    {val.sign_3 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.sign_3}</li>
                                                                        </>
                                                                    )}
                                                                    {val.sign_4 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.sign_4}</li>
                                                                        </>
                                                                    )}
                                                                    {val.sign_5 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.sign_5}</li>
                                                                        </>
                                                                    )}
                                                                    {val.sign_6 && (
                                                                        <>
                                                                            <li className='list-item-1'>{val.sign_6}</li>
                                                                        </>
                                                                    )}
                                                                </ul>
                                                            </>
                                                        )}

                                                    </li>
                                                ))}
                                            </div >
                                        </ol>

                                        <p className='d-flex justify-content-end'>{lists.datetime}</p>
                                    </div>
                                </div>

                            </div>
                        </>
                    )}
                    {!lists &&
                        <>
                            <h2>Không tìm thấy bài ngữ pháp</h2>
                            <p>
                                <Link reloadDocument to='/listGrammar'>Quay về Danh sách Ngữ Pháp</Link>
                            </p>
                        </>
                    }
                </div >
            </div >
        </>
    )
}

export default GrammarPage