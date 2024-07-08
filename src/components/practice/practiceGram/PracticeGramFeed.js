import React from 'react';
import PracticeGram from './PracticeGram';
const PracticeGramFeed = ({ listPracGram }) => {
    return (
        <>
            <div>
                {listPracGram.map((prac) => (
                    <PracticeGram key={prac._id} val={prac} />
                ))}
            </div>
        </>
    )
}

export default PracticeGramFeed;