import React, { useEffect, useState } from 'react';
import CandidatesCard from '../../components/CandidatesCard';
import { contractMethod } from '../../api/electionContract';
import { getCurrentState } from '../../utils/contract_utils';

const VoterHome = () => {
    const [electionStatus, setElectionStatus] = useState("Registration not started yet!")
    const [registrationStarted, setRegistrationStarted] = useState(false);
    const [isElection, setIsElection] = useState(false);
    async function checkInitialState() {
        try {
            const tx = await contractMethod.methods.getCurrentState().call();
            if (tx == 1) setRegistrationStarted(true);
            if (tx == 2) setRegistrationStarted(false);
            if (tx == 3) setIsElection(true);
            if (tx == 4) setIsElection(false);
            const status = getCurrentState(Number(tx))
            setElectionStatus(status);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        checkInitialState();
    }, [])
    return (
        <>

            <div className='voter-home'>
                <h1>Vote For Change</h1>
                <hr />
                <h2>Election Status: <span className='status'>{electionStatus}</span></h2>
                {registrationStarted ? <div>
                    <div>
                        <p><h3>Register Here</h3></p>
                    </div>

                    <form>
                        <input type='text' placeholder='Citizenship Number' />
                        <button className='card-button'>Register</button>
                    </form></div>
                    : isElection ? <CandidatesCard /> : "Wait for the election to start!"}
            </div>
        </>
    )
}

export default VoterHome