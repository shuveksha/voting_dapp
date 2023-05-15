import React, { useState, useEffect } from 'react';
import CandidateCard from './CandidateCard';
import { fetchCandidates, getUserActiveAddress } from '../utils/contract_utils';
import { contractMethod } from '../api/electionContract';

const CandidatesCard = () => {
    const [selectedCandidateId, setSelectedCandidateId] = useState(0);
    const [candidateList, setCandidateList] = useState([]);
    const [activeAddress, setActiveAddress] = useState("")
    const submitVote = async (e) => {
        e.preventDefault();
        try {
            const tx = await contractMethod.methods.vote(Number(selectedCandidateId)).send({ from: activeAddress })
                .on('confirmation', () => {
                    console.log('this user voted successfully now');
                });
        } catch (error) {
            if (error.message.includes("not registered/approved")) {
                console.log("You are not registered or approved");
            }
        }
    };

    useEffect(() => {
        async function getFetchedData() {
            const data = await fetchCandidates();
            setCandidateList(data);
        }
        setActiveAddress(getUserActiveAddress());
        getFetchedData();
    }, []);


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

            <div className='card-container pt'>
                {candidateList.map((candidate, candidateId) => {
                    return (
                        <CandidateCard
                            candidate={candidate}
                            candidateId={candidateId + 1}
                            selectedCandidateId={selectedCandidateId}
                            setSelectedCandidateId={setSelectedCandidateId}
                            key={candidate.partyId}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CandidatesCard;
