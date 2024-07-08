import React from 'react';
import PracticeVocab from './PracticeVocab';
const PracticeVocabFeed = ({ listVocab }) => {
    return (
        <>
            <div>
                {listVocab.map((listVocabulary) => (
                    <PracticeVocab key={listVocabulary._id} val={listVocabulary} />
                ))}
            </div>
        </>
    )
}

export default PracticeVocabFeed;