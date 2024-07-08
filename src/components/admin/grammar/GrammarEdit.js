import React from 'react';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import DataContext from '../../../context/DataContext';
import axios from '../../../api/axios';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
const GrammarEdit = ({ id }) => {

    const { listGram, setListGram } = useContext(DataContext);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const lists = listGram.find(val => (val._id).toString() === id);
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (lists) {
            setEditTitle(lists.title);
            setEditBody(lists.body);
        }
    }, [lists, setEditBody, setEditTitle])
    // Edit list
    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updateList = { title: editTitle, datetime: datetime, body: editBody };
        try {
            const response = await axios.put(`/listGrammar/${id}`, updateList);
            setListGram(listGram.map(val => val._id === id ? { ...response.data } : val))
            setEditTitle('');
            setEditBody('');
            setSuccess(true);
            setMessage("Thành công");
            console.log('Success');
        } catch (err) {
            setSuccess(false);
            setMessage("Thất bại");
            console.log(`Error: ${err.message}`);
        }
    }

    // Edit Grammar
    const [file, setFile] = useState('');
    const handleEditGrammar = async (collectionName) => {
        try {
            const formData = new FormData();
            formData.append('csvFile', file)
            await axios.put(`/grammarList/${collectionName}`, formData);
            setFile('');
            console.log('Success');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return (
        <>
            {editTitle &&
                <>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Tiêu Đề</label>
                            <input
                                type="text"
                                className=" form-control"
                                id="title"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="body" className="form-label">Nội dung</label>
                            <textarea
                                className="form-control"
                                id="body"
                                rows="5"
                                value={editBody}
                                onChange={(e) => setEditBody(e.target.value)}
                                required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Dữ liệu bài học</label>
                            <input
                                className="form-control"
                                type="file"
                                id="formFile"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept='.csv'
                            />
                        </div>
                        <div className='text-center'>
                            <button type="submit" className=" btn btn-primary" onClick={() => {
                                handleEdit(lists._id)
                                handleEditGrammar(lists.collectionName)
                            }}>
                                Xác Nhận
                            </button>
                        </div>
                    </form>

                    {/* Modal thông báo thành công hoặc thất bại */}
                    <div className={`modal fade ${success !== null ? 'show d-block' : ''}`} tabIndex="-1" aria-labelledby="statusModalLabel" aria-hidden={success === null}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {success ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" size="2x" />
                                    ) : (
                                        <FontAwesomeIcon icon={faTimesCircle} className="me-2 text-danger" size="2x" />
                                    )}
                                    <h5 className="modal-title" id="statusModalLabel">Thông báo</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                        setMessage('');
                                        setSuccess(null);
                                    }}></button>
                                </div>
                                <div className="modal-body">
                                    {message}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

            {!editTitle &&
                <>
                    <h2>Không tìm thấy Bài Ngữ Pháp</h2>
                </>
            }
        </>
    )
}

export default GrammarEdit;