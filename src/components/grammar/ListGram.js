import { Link } from 'react-router-dom';

const ListGram = ({ val }) => {
    return (
        <div >
            <li>
                <Link reloadDocument to={`/listGrammar/${val._id}`} className='fw-semibold text-black link-underline link-underline-opacity-0 link-offset-2 link-underline-opacity-100-hover' >{val.title}</Link>
            </li>
        </div >
    )
}

export default ListGram;