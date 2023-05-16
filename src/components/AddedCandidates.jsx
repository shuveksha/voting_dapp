import React, { useState, useEffect } from 'react'
import CandidateCard from './CandidateCard';
import { fetchCandidates, getUserActiveAddress } from '../utils/contract_utils';
const AddedCandidates = () => {
    const [selectedCandidateId, setSelectedCandidateId] = useState(0);
    const [candidateList, setCandidateList] = useState([]);


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
                    <p className='candidate-select pt'>
                        <h2>Available Candidates to Vote</h2>
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
                                isFromAddedCandidates={true}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default AddedCandidates