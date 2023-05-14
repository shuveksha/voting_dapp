import React, { useState, useEffect } from 'react';
import { Data } from './dummyData';
import CandidateCard from './CandidateCard';
import { fetchCandidates } from '../utils/contract_utils';

const CandidatesCard = () => {
    const [selectedCandidateId, setSelectedCandidateId] = useState(0);
    const [candidateList, setCandidateList] = useState([]);

    const submitVote = (e) => {
        e.preventDefault();
        console.log("submit clicked");
    };

    useEffect(() => {
        async function getFetchedData() {
            const data = await fetchCandidates();
            setCandidateList(data);
        }

        getFetchedData();
    }, []); // Empty dependency array ensures that this effect runs only once on component mount


    return (
        <div className='candidates-card'>
            <div>
                <p className='candidate-select'>
                    <h3>Select your Candidate</h3>
                    <button className='filled-btn' disabled={selectedCandidateId > 0 ? false : true} onClick={submitVote}>
                        Submit
                    </button>
                </p>
            </div>

            <div className='card-container'>
                {candidateList.map((candidate, candidateId) => {
                    return (
                        <CandidateCard
                            candidate={candidate}
                            candidateId={candidateId + 1}
                            selectedCandidateId={selectedCandidateId}
                            setSelectedCandidateId={setSelectedCandidateId}
                            key={candidate.uri}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CandidatesCard;
