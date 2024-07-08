import { Link } from 'react-router-dom';

const Grammar = ({ val }) => {

    return (
        <div className="card my-3">
            <Link reloadDocument to={`/listGrammar/${val._id}`} className='card-header fs-5 fw-semibold text-primary link-underline link-underline-opacity-0 list-group-item-action list-group-item-primary' >{val.title}</Link>
            <div className="card-body">
                <p className="card-text fw-bolder">{val.body}</p>
                <p className="card-text">Thời gian đăng: {val.datetime}</p>
            </div>
        </div >
    )
}

export default Grammar;