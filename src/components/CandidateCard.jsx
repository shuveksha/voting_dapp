import React from 'react'
import { getPartyName } from '../utils/app_utils';

const CandidateCard = ({ candidate, candidateId, selectedCandidateId, setSelectedCandidateId }) => {

    function handleCandidateSelection() {
        setSelectedCandidateId(candidateId);
    }
    return (
        <div className='card'>
            <img className="card-image" src="https://via.placeholder.com/300x150" alt="" />
            <div className="card-content">
                <h2 className="card-title">{candidate.candidate_name}</h2>
                <div><p className="card-description">{getPartyName(candidate.partyId)}</p></div>
                <button className={` ${candidateId === selectedCandidateId ? "filled-btn" : "card-button"}`} onClick={handleCandidateSelection}>{candidateId === selectedCandidateId ? "Selected" : "select"}</button>
            </div>
        </div>
    )
}

export default CandidateCard