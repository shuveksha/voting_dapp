import React, { useState } from 'react'
import { Data } from './dummyData';
import CandidateCard from './CandidateCard';

const CandidatesCard = () => {
    const [selectedCandidateId, setSelectedCandidateId] = useState(0);
    const submitVote = (e) => {
        e.preventDefault();
        console.log("submit clicked");
    }
    return (
        <div className='candidates-card'>
            <div><p className='candidate-select'>
                <h3>Select your Candidate</h3>
                <button className='filled-btn' disabled={selectedCandidateId > 0 ? false : true} onClick={submitVote}>
                    Submit
                </button>
            </p></div>

            <div className='card-container'>
                {Data.map((candidate, candidateId) => {
                    return <CandidateCard candidate={candidate} candidateId={candidateId + 1} selectedCandidateId={selectedCandidateId} setSelectedCandidateId={setSelectedCandidateId} key={candidate.partyId} />
                })}
            </div>
        </div>
    )
}

export default CandidatesCard;