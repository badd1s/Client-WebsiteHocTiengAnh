import React from 'react';
import ListGram from './ListGram';
const ListGramFeed = ({ listGram }) => {
    return (
        <>
            <div>
                {listGram.map((listGrammar) => (
                    <ListGram key={listGrammar._id} val={listGrammar} />
                ))}
            </div>
        </>
    )
}

export default ListGramFeed;