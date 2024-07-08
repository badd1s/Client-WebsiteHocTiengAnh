import React, { useState, useContext } from 'react';
import DataContext from '../../../context/DataContext';
import axios from '../../../api/axios';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const NewGrammar = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [collectionName, setCollectionName] = useState('');
    const { listGram, setListGram } = useContext(DataContext);
    const [file, setFile] = useState({});
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newList = { title: title, datetime: datetime, body: body, collectionName: collectionName };

        try {
            // Post data to backend
            const response = await axios.post('/listGrammar', newList);
            const allLists = [...listGram, response.data];

            // Upload file
            const formData = new FormData();
            formData.append('csvFile', file);
            await axios.post(`/grammarList/${collectionName}`, formData);

            // Update state and show success message
            setListGram(allLists);
            setTitle('');
            setBody('');
            setCollectionName('');
            setFile({});
            setSuccess(true);
            setMessage("Thêm Thành Công");
        } catch (err) {
            // Handle error
            setSuccess(false);
            setMessage("Thêm Thất Bại");
            console.error(`Error: ${err.message}`);
        }
    };

    return (
        <>
            <div className='col-10 mx-auto py-5'>
                <div className='card'>
                    <div className='card-body'>
                        <h4 className="text-center pb-3">Thêm Bài Ngữ Pháp Mới</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Tên Bài Học</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="body" className="form-label">Tóm tắt</label>
                                <textarea
                                    className="form-control"
                                    id="body"
                                    rows="5"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="collectionName" className="form-label">Tên dữ liệu</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="collectionName"
                                    value={collectionName}
                                    onChange={(e) => setCollectionName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Dữ liệu bài học</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    required
                                    accept='.csv'
                                />
                            </div>
                            <div className='text-center'>
                                <button type="submit" className="btn btn-primary">Xác Nhận</button>
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
                    </div>
                </div>
            </div>
        </>

    );
};

export default NewGrammar;
