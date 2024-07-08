import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import axios from '../../api/axios';
import { format } from 'date-fns';
const EditPost = () => {

    const { post, setPost } = useContext(DataContext);

    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { id } = useParams();
    const posts = post.find(val => (val._id).toString() === id);
    const navigate = useNavigate();

    useEffect(() => {
        if (posts) {
            setEditTitle(posts.title);
            setEditBody(posts.body);
        }
    }, [posts, setEditBody, setEditTitle])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'dd/MM/yyyy pp');
        const updatePost = { title: editTitle, datetime: datetime, body: editBody };
        try {
            const response = await axios.put(`/homePost/${id}`, updatePost);
            setPost(post.map(val => val._id === id ? { ...response.data } : val))
            setEditTitle('');
            setEditBody('');
            navigate('/homePost');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }
    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 p-5'>
                    {id &&
                        <>
                            <p className="fs-3 text-center text-primary pb-3">
                                Sửa Bài Viết Mới
                            </p>
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
                                        rows="20"
                                        value={editBody}
                                        onChange={(e) => setEditBody(e.target.value)}
                                        required></textarea>
                                </div>
                                <button type="submit" className=" btn btn-primary" onClick={() => handleEdit(posts._id)}>
                                    Submit
                                </button>
                            </form>
                        </>
                    }

                    {!id &&
                        <>
                            <h2>Không tìm thấy bài viết</h2>
                            <p>
                                <Link reloadDocument to='/homePost'>Quay về</Link>
                            </p>
                        </>
                    }
                </div>
            </div >
        </>
    )
}

export default EditPost;