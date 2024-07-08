import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
const PracticeGram = ({ val }) => {
    const { userLogin } = useContext(AuthContext);
    const userId = userLogin._id;
    const [scoreGram, setScoreGram] = useState([]);
    const { data: dataScoreGram } = useAxiosFetch(`/scoreGram/${userId}/${val._id}`);

    useEffect(() => {
        dataScoreGram &&
            setScoreGram(dataScoreGram);
    }, [dataScoreGram, setScoreGram]);

    return (
        <>
            <div className="card my-3">
                <Link reloadDocument to={`/listPracticeGram/${userId}/${val._id}`} className='card-header fs-5 fw-semibold text-primary link-underline link-underline-opacity-0 list-group-item-action list-group-item-primary' >{val.title}</Link>
                <div className="card-body">
                    <div className='d-flex row'>
                        <div className='col-6'>
                            <p className='card-text fw-bolder'>{val.body}</p>
                            <p className='card-text'>Điểm gần nhất: {scoreGram.lastScore ? `${scoreGram.lastScore}/30` : ''}</p>
                            <p className='card-text'>Điểm cao nhất: {scoreGram.score ? `${scoreGram.score}/30` : ''}</p>
                        </div>
                        <p className="col-6 card-text d-flex justify-content-center align-items-center">Updated At: {val.datetime}</p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default PracticeGram;
