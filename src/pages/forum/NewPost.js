import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import axios from '../../api/axios';
import { format } from 'date-fns';
import AuthContext from '../../context/AuthContext';

const NewPost = () => {
    const titleRef = useRef(null);
    const bodyRef = useRef(null);
    const { post, setPost } = useContext(DataContext);
    const { userLogin } = useContext(AuthContext);
    const authorId = userLogin._id;
    const authorName = userLogin.name;
    const authorAvatar = userLogin.avatar;
    const navigate = useNavigate();

    // Post data
    const handleSubmitPost = async (e) => {
        e.preventDefault();
        const datetime = format(new Date(), 'dd/MM/yyyy pp');
        const newPost = {
            title: titleRef.current.value,
            datetime: datetime,
            body: bodyRef.current.value,
            authorId: authorId,
            authorName: authorName,
            authorAvatar: authorAvatar
        };
        try {
            const response = await axios.post('/homePost', newPost);
            const allPosts = [...post, response.data];
            setPost(allPosts);
            titleRef.current.value = '';
            bodyRef.current.value = '';
            navigate('/homePost');
            window.location.reload();
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };

    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 p-5'>
                    <p className="fs-3 text-center text-primary pb-3">
                        Bài Viết Mới
                    </p>
                    <form onSubmit={handleSubmitPost}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Tiêu Đề</label>
                            <input
                                type="text"
                                className=" form-control"
                                id="title"
                                ref={titleRef}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="body" className="form-label">Nội dung</label>
                            <textarea
                                className="form-control "
                                id="body"
                                rows={20}
                                ref={bodyRef}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className=" btn btn-primary">
                            Xác Nhận
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewPost;
