import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from '../../../api/axios';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../components/system/Loading';
import DataContext from '../../../context/DataContext';
const PracticeVocabPage = () => {

    // Data List
    const { listVocab } = useContext(DataContext);
    const { userId, exerciseId } = useParams();
    const lists = listVocab.find(val => (val._id).toString() === exerciseId);

    // Data Vocab
    const [vocab, setVocab] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (lists) {
            axios.get(`/vocabularyList/${lists.collectionName}`).then((res) => {
                const selectedVocab = getRandomItems(res.data, 30);
                setVocab(selectedVocab);
                setLoading(false);
            });
        }
    }, [lists]);

    const [options, setOptions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuest, setCurrentQuest] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState(Array(30).fill(null));

    // Random Question
    const getRandomItems = (array, num) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    // Đáp án đúng, sai
    const generateOptions = useCallback((question) => {
        const correctOption = { text: question.meaning, correct: true };
        const incorrectOptions = vocab
            .filter(v => v._id !== question._id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(v => ({ text: v.meaning, correct: false }));
        const options = [correctOption, ...incorrectOptions].sort(() => 0.5 - Math.random());
        setOptions(options);
    }, [vocab]);

    // Render câu hỏi, đáp án
    useEffect(() => {
        if (vocab.length > 0) {
            generateOptions(vocab[currentQuest]);
        }
    }, [vocab, currentQuest, generateOptions]);

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

    // Submit
    const handleSubmit = async () => {
        const newScore = answers.reduce((acc, curr) => (curr ? acc + 1 : acc), 0);
        setScore(newScore);
        setSubmitted(true);

        try {
            await axios.post(`/scoreVocab/updateScoreVocab`, {
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
                <h2>Không tìm thấy từ vựng</h2>
                <p>
                    <Link to='/listPracticeVocab'>Quay về</Link>
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
                            {vocab.map((_, index) => (
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
                                {vocab[currentQuest].vocabulary}
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
                        <p className="fs-5 fw-bolder text-center">Điểm: {submitted ? score : ' '}/{vocab.length}</p>
                        <button className="btn btn-success d-block mb-3 mx-auto" onClick={() => setCurrentQuest(currentQuest + 1)} disabled={currentQuest === vocab.length - 1}>Câu tiếp</button>
                        <button className="btn btn-danger d-block mx-auto fs-5 fw-bolder" onClick={handleSubmit} disabled={answers.length !== vocab.length} >Nộp bài</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PracticeVocabPage;
