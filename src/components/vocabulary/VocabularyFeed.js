import React from 'react';
import Vocabulary from './Vocabulary';
const VocabularyFeed = ({ listVocab }) => {
    return (
        <>
            <div>
                {listVocab.map((listVocabulary) => (
                    <Vocabulary key={listVocabulary._id} val={listVocabulary} />
                ))}
            </div>
        </>
    )
}

export default VocabularyFeed;