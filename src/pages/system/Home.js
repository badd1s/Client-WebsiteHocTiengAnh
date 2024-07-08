import React from "react";
import imgHero from "../../assets/imgs/imgHero.jpg";
import imgPractice from "../../assets/imgs/imgPractice.jpg";
import imgLearn from "../../assets/imgs/imgLearn.jpg";
import imgForum from "../../assets/imgs/imgForum.jpg";
import { Link } from "react-router-dom";
const Home = () => {

    return (
        <>
            {/* Hero section */}
            <div className="container-fluid bg-light">
                <div className="container px-0 bg-white shadow-sm rounded">
                    {/* Hero Image */}
                    <img
                        src={imgHero}
                        alt="Img Home 1"
                        className="img-fluid rounded w-100"
                    />
                </div>
            </div>

            {/* Content section */}
            <div className="container-fluid bg-light">
                <div className="container bg-white shadow-sm rounded py-4">
                    <div className="row align-items-center mb-4">
                        {/* Learn Section */}
                        <div className="col-md-6">
                            <div className="p-4">
                                <img
                                    src={imgLearn}
                                    className="img-fluid rounded shadow w-100"
                                    alt="Img Home 2"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-4">
                                <h2 className="text-primary fs-3 text-center mb-4">Học Tập</h2>
                                <p className="fs-5">
                                    Tìm hiểu về các Bảng chữ cái và Bảng phiên âm IPA,
                                    từ vựng và ngữ pháp cơ bản trong tiếng Anh.
                                </p>
                                <Link
                                    reloadDocument
                                    to="/alphabet"

                                    className="text-primary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-center fs-5 d-block mt-3"
                                >
                                    Bảng chữ cái/ Bảng phiên âm
                                </Link>
                                <Link
                                    reloadDocument
                                    to="/listVocabulary"
                                    className="text-primary text-center fs-5 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover d-block mt-3"
                                >
                                    Từ vựng
                                </Link>
                                <Link
                                    reloadDocument
                                    to="/listGrammar"
                                    className="text-primary text-center fs-5 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover d-block mt-3"
                                >
                                    Ngữ pháp
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center mb-4">
                        {/* Practice Section */}
                        <div className="col-md-6 order-md-2">
                            <div className="p-4">
                                <img
                                    src={imgPractice}
                                    className="img-fluid rounded shadow w-100"
                                    alt="Img Home 3"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 order-md-1">
                            <div className="p-4">
                                <h2 className="text-primary fs-3 text-center mb-4">Ôn Tập</h2>
                                <p className="fs-5">
                                    Ôn tập và củng cố kiến thức với các bài tập từ vựng
                                    và ngữ pháp đã được học.
                                </p>
                                <Link
                                    reloadDocument
                                    to="/listPracticeVocab"
                                    className="text-primary text-center fs-5 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover d-block mt-3"
                                >
                                    Ôn tập từ vựng
                                </Link>
                                <Link
                                    reloadDocument
                                    to="/listPracticeGram"
                                    className="text-primary text-center fs-5 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover d-block mt-3"
                                >
                                    Ôn tập ngữ pháp
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        {/* Forum Section */}
                        <div className="col-md-6">
                            <div className="p-4">
                                <img
                                    src={imgForum}
                                    className="img-fluid rounded shadow w-100"
                                    alt="Img Home 4"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-4">
                                <h2 className="text-primary text-center fs-3 mb-4">Diễn Đàn</h2>
                                <p className="fs-5">
                                    Tham gia diễn đàn để chia sẻ thông tin hữu ích,
                                    đặt câu hỏi và trao đổi kiến thức với cộng đồng.
                                </p>
                                <Link
                                    reloadDocument
                                    to="/homePost"
                                    className="text-primary text-center fs-5 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover d-block mt-3"
                                >
                                    Tham gia ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Home;
