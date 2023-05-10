import React, { useEffect, useState } from 'react';
import CandidatesCard from '../../components/CandidatesCard';

const VoterHome = () => {
    const [electionStatus, setElectionStatus] = useState("Registration not started yet!")
    const [registrationStarted, setRegistrationStarted] = useState(false);
    const [isElection, setIsElection] = useState(false);
    async function checkRegistration() {
        // To-Do check the status interacting with contract
        setRegistrationStarted(true);
        setElectionStatus("Registration is started!")
    }
    async function checkElection() {
        // To-Do check the status interacting with contract
        setIsElection(true);
        setElectionStatus("Election is started!");
    }
    useEffect(() => {
        // checkRegistration();
        checkElection();
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