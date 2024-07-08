import React from 'react';
import ListVocab from './ListVocab';
const ListVocabFeed = ({ listVocab }) => {
    return (
        <>
            <div>
                {listVocab.map((listVocab) => (
                    <ListVocab key={listVocab._id} val={listVocab} />
                ))}
            </div>
        </>
    )
}

export default ListVocabFeed;