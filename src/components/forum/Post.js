import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ val }) => {

    return (
        <div className="card my-2">
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-2 text-center'>
                        <img
                            src={val.authorAvatar}
                            className="img-fluid fixed-avatar-2 bg-info rounded-circle"
                            alt="Avatar"
                        />
                        <p className='fw-bold'>{val.authorName}</p>
                    </div>
                    <div className='col-md-8'>
                        <Link reloadDocument to={`/homePost/${val._id}`} className='text-decoration-none'>
                            <h5 className='card-title text-primary'>{val.title}</h5>
                        </Link>
                        <p className="card-tex">
                            {(val.body).length <= 50
                                ? val.body
                                : `${val.body.slice(0, 50)}...`
                            }

                        </p>
                    </div>
                    <p className='col-md-2 d-flex align-items-center'>{val.datetime}</p>
                </div>
            </div>
        </div>
    );
};

export default Post;
