import React, { useState, useEffect } from 'react'
import CandidateCard from './CandidateCard';
import { fetchCandidates, getUserActiveAddress } from '../utils/contract_utils';
const AddedCandidates = () => {
    const [selectedCandidateId, setSelectedCandidateId] = useState(0);
    const [candidateList, setCandidateList] = useState([]);
    const [isFromAddedCandidates, setIsFromAddedCandidates] = useState(true);


    useEffect(() => {
        async function getFetchedData() {
            const data = await fetchCandidates();
            setCandidateList(data);
        }
        getFetchedData();
    }, []);
    return (
        <div className='voter-home'>

            <div className='candidates-card'>
                <div>
                    <p className='candidate-select'>
                        <h2>Available Candidates to Vote</h2>
                        {/* <button className='filled-btn' disabled={selectedCandidateId > 0 ? false : true} onClick={submitVote}>
                        Submit
                    </button> */}
                    </p>
                </div>
                <div className='card-container pt'>
                    {candidateList.map((candidate, candidateId) => {
                        return (
                            <CandidateCard
                                candidate={candidate}
                                candidateId={candidateId + 1}
                                selectedCandidateId={selectedCandidateId}
                                setSelectedCandidateId={setSelectedCandidateId}
                                key={candidate.partyId}
                                isFromAddedCandidates={isFromAddedCandidates}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default AddedCandidates