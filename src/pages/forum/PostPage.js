import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import axios from '../../api/axios'
import AuthContext from '../../context/AuthContext';
import Comment from '../../components/forum/Comment';
const PostPage = () => {
    // data user
    const { userLogin } = useContext(AuthContext);
    const userId = userLogin._id;

    const { post, setPost } = useContext(DataContext);
    const navigate = useNavigate();
    // Delete post
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/homePost/${id}`);
            const updatedList = post.filter(val => val._id !== id);
            setPost(updatedList);
            navigate('/homePost');
            window.location.reload();
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }
    const { id } = useParams();
    const posts = post.find(val => (val._id).toString() === id);
    const authorId = posts ? posts.authorId : null;
    const authorAvatar = posts ? posts.authorAvatar : null;
    const authorName = posts ? posts.authorName : null;
    return (
        <>
            <div className='container-fluid bg-light'>
                <div className='container bg-white min-vh-100 p-5'>
                    {posts &&
                        <>
                            {/* Bài viết */}
                            <div className='row d-flex'>
                                <div className='col-md-3'>
                                    <img
                                        src={authorAvatar}
                                        className="img-fluid bg-primary-subtle rounded-circle"
                                        alt="Avatar"
                                    />
                                    <p className='fw-bolder fs-5 text-center'>{authorName}</p>
                                </div>
                                <div className='col-md-9'>
                                    <div className='card'>
                                        <p className='card-title fs-3 text-center text-primary'>{posts.title}</p>
                                        <div className='card-body'>
                                            {/* Nội dung */}
                                            <div style={{ whiteSpace: 'pre-line' }}>

                                                {posts.body}
                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <p>{posts.datetime}</p>
                                            </div>
                                            {/* Chỉ người đăng mới được sửa và xoá */}
                                            {userId === authorId &&
                                                <div className='d-flex justify-content-end'>
                                                    <Link reloadDocument to={`/editPost/${posts._id}`}>
                                                        <button type='button' className='btn bg-info' >
                                                            Chỉnh sửa
                                                        </button>
                                                    </Link>
                                                    <button type='button' className='btn bg-danger mx-2' onClick={() => handleDelete(posts._id)}>
                                                        Xoá
                                                    </button>
                                                </div>
                                            }
                                            {/* Bình luận */}
                                            <div>
                                                <Comment postId={posts._id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {!posts &&
                        <>
                            <h2>Không tìm thấy bài viết</h2>
                            <p>
                                <Link reloadDocument to='/homePost'>Quay về Diễn Đàn</Link>
                            </p>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default PostPage;