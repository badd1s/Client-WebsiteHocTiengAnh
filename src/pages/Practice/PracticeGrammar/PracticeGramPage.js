import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from '../../../api/axios';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../components/system/Loading';
import DataContext from '../../../context/DataContext';

const PracticeGramPage = () => {
    // Data List
    const { listPracGram } = useContext(DataContext);
    const { userId, exerciseId } = useParams();
    const lists = listPracGram.find(val => (val._id).toString() === exerciseId);

    // Data Gram
    const [grammar, setGrammar] = useState([]);
    const [loading, setLoading] = useState(true);

    const [options, setOptions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuest, setCurrentQuest] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState(Array(30).fill(null));

    useEffect(() => {
        if (lists) {
            axios.get(`/practiceGrammar/${lists.collectionName}`).then((res) => {
                const selectedGrammar = getRandomItems(res.data, 30);
                setGrammar(selectedGrammar);
                setLoading(false);
            });
        }
    }, [lists]);

    //Random câu hỏi
    const getRandomItems = (array, num) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    //Lọc đáp án đúng và sai 
    const generateOptions = useCallback((question) => {
        const correctOption = { text: question.correct, correct: true };
        const incorrectOptions = [
            { text: question.optionA, correct: false },
            { text: question.optionB, correct: false },
            { text: question.optionC, correct: false },
            { text: question.optionD, correct: false }
        ].filter(option => option.text !== question.correct);

        const options = [correctOption, ...incorrectOptions].sort(() => 0.5 - Math.random());
        setOptions(options);
    }, []);

    useEffect(() => {
        if (grammar.length > 0) {
            generateOptions(grammar[currentQuest]);
        }
    }, [grammar, currentQuest, generateOptions]);

    // Chọn đáp án
    const handleOptionClick = (option, index) => {
        if (submitted) return;

        const newAnswers = [...answers];
        newAnswers[currentQuest] = option.correct;
        setAnswers(newAnswers);

        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[currentQuest] = index;
        setSelectedOptions(newSelectedOptions);
    };

    // Nộp bài, cập nhật điểm
    const handleSubmit = async () => {
        const newScore = answers.reduce((acc, curr) => (curr ? acc + 1 : acc), 0);
        setScore(newScore);
        setSubmitted(true);

        try {
            await axios.post(`/scoreGram/updateScoreGram`, {
                userId,
                exerciseId,
                newScore
            });
            console.log('Updated score success');
        } catch (error) {
            console.error('Error updating score:', error);
        }
    };

    // Chọn câu hỏi
    const handleQuestionSelect = (index) => {
        setCurrentQuest(index);
    };

    if (loading) {
        return <Loading />;
    }

    if (!lists) {
        return (
            <div>
                <h2>Không tìm thấy bài tập ngữ pháp</h2>
                <p>
                    <Link reloadDocument to='/listPracticeGrammar'>Quay về</Link>
                </p>
            </div>
        );
    }

    return (
        <div className="container-fluid bg-light">
            <div className="container bg-white min-vh-100 py-5">
                <p className="fs-3 text-center text-primary pb-3">
                    Chủ đề {lists.title}
                </p>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <p className="fs-5 fw-bolder">Các câu hỏi</p>
                        <div className="d-flex row">
                            {grammar.map((_, index) => (
                                <div key={index} className={`col-2 val-box rounded btn btn-outline-primary ${index === currentQuest ? 'active' : ''}`} onClick={() => handleQuestionSelect(index)}>
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <p className="fs-5 fw-bolder">Chọn đáp án đúng</p>
                        <div className="card mx-auto bg-info-subtle p-5 mb-5">
                            <span className="fw-bolder fs-5 card-body">
                                {grammar[currentQuest].question}
                            </span>
                        </div>
                        <div className="text-center">
                            <div className="row">
                                {options.map((option, index) => (
                                    <div className={`col-6 mt-${index > 1 ? 4 : 0}`} key={index}>
                                        <button
                                            type="button"
                                            className={`col-12 mx-auto btn btn-outline-primary ${!submitted && selectedOptions[currentQuest] === index ? 'active' : ''} ${submitted && option.correct ? 'text-white btn-success' : submitted && selectedOptions[currentQuest] === index ? 'text-white btn-danger' : ''}`}
                                            onClick={() => handleOptionClick(option, index)}
                                        >
                                            {['A', 'B', 'C', 'D'][index]}. {option.text}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 mx-auto">
                        <p className="fs-5 fw-bolder text-center">Điểm: {submitted ? score : ' '}/{grammar.length}</p>
                        <button className="btn btn-success d-block mb-3 mx-auto" onClick={() => setCurrentQuest(currentQuest + 1)} disabled={currentQuest === grammar.length - 1}>Câu tiếp</button>
                        <button className="btn btn-danger d-block mx-auto fs-5 fw-bolder" onClick={handleSubmit} disabled={answers.length !== grammar.length}  >Nộp bài</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PracticeGramPage;
