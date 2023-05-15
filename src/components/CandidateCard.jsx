import React from 'react'
import { getPartyName } from '../utils/app_utils';

const CandidateCard = ({ candidate, candidateId, selectedCandidateId, setSelectedCandidateId, isFromAddedCandidates }) => {

    function handleCandidateSelection() {
        setSelectedCandidateId(candidateId);
    }
    return (
        <div className='card'>
            <div style={{ "padding": '10px' }}>
                <img className="card-image" style={{ 'borderRadius': '10px' }} src={candidate.uri} alt="" />
            </div>

            <div className="card-content">
                <h2 className="card-title">{candidate.candidate_name}</h2>
                <div><p className="card-description">{getPartyName(Number(candidate.partyId))}</p></div>
                {
                    !isFromAddedCandidates && <button className={` ${candidateId === selectedCandidateId ? "filled-btn" : "card-button"}`} onClick={handleCandidateSelection}>{candidateId === selectedCandidateId ? "Selected" : "select"}</button>
                }

            </div>
        </div>
    )
}

export default CandidateCard