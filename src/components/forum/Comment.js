import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { format } from 'date-fns';
import axios from '../../api/axios';

const Comment = ({ postId }) => {
    const { userLogin } = useContext(AuthContext);
    const userAvatar = userLogin.avatar;
    const userName = userLogin.name;
    const userId = userLogin._id;
    const commentRef = useRef(null);

    // Lấy danh sách comment cho từng postId
    const [comments, setComments] = useState([]);
    const { data: dataComment } = useAxiosFetch(`/comment/${postId}`);
    useEffect(() => {
        if (dataComment) {
            setComments(dataComment);
        }
    }, [dataComment]);


    // Submit
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const datetime = format(new Date(), 'dd/MM/yyyy pp');

        const newComment = {
            postId: postId,
            datetime: datetime,
            content: commentRef.current.value,
            authorId: userId,
            name: userName,
            avatar: userAvatar
        };
        try {
            const response = await axios.post(`/comment/${postId}`, newComment);
            const allComments = [...comments, response.data];
            setComments(allComments);
            commentRef.current.value = '';
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };

    // Delete
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/comment/${postId}`, { data: { commentId } });
            const listComments = comments.filter(comment => comment._id !== commentId);
            setComments(listComments);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };

    return (
        <>
            <h5>Bình luận :</h5>
            <div className="mt-4">
                <div className='card'>
                    <div className='card-body'>
                        <div className='d-flex row'>
                            <div className='col-md-3 text-center'>
                                <img
                                    src={userAvatar}
                                    className="img-fluid fixed-avatar-2 bg-primary-subtle rounded-circle"
                                    alt="Avatar"
                                />
                                <p className='fw-bold'>{userName}</p>
                            </div>
                            <form onSubmit={handleSubmitComment} className='col-md-9'>
                                <textarea
                                    className='bg-info-subtle form-control rounded'
                                    ref={commentRef}
                                    placeholder="Viết bình luận của bạn..."
                                    rows={4}
                                />
                                <div className="mt-2 d-flex justify-content-end">
                                    <button className="btn btn-primary btn-sm">Gửi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {comments.slice().reverse().map((comment, index) => (
                    <div key={index} className="card mt-3">
                        <div className="card-body">
                            <div className='d-flex row'>
                                <div className='col-md-3 text-center'>
                                    <img
                                        src={comment.avatar}
                                        className="img-fluid fixed-avatar-2 bg-primary-subtle rounded-circle"
                                        alt="Avatar"
                                    />
                                    <p className='fw-bold'>{comment.name}</p>
                                    <p className=''>{comment.datetime} </p>
                                </div>
                                <div className='col-md-9'>
                                    <textarea
                                        className='bg-info-subtle form-control rounded'
                                        rows={4}
                                        disabled
                                        value={comment.content}
                                    ></textarea>
                                    {userId === comment.authorId && (
                                        <div className="mt-2 d-flex justify-content-end">
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteComment(comment._id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Comment;
