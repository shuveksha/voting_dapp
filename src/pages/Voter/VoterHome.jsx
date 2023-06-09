import React, { useEffect, useState } from 'react';
import CandidatesCard from '../../components/CandidatesCard';
import { contractMethod } from '../../api/electionContract';
import { getCurrentState } from '../../utils/contract_utils';

const VoterHome = () => {
    const [electionStatus, setElectionStatus] = useState("Registration not started yet!")
    const [registrationStarted, setRegistrationStarted] = useState(false);
    const [isElection, setIsElection] = useState(false);
    const [activeAddress, setActiveAddress] = useState("")
    const [citizenshipNo, setCitizenshipNo] = useState("");
    const [votersList, setVotersList] = useState([]);

    async function checkInitialState() {
        try {

            const tx = await contractMethod.methods.getCurrentState().call();
            if (Number(tx) === 1) setRegistrationStarted(true);
            if (Number(tx) === 2) setRegistrationStarted(false);
            if (Number(tx) === 3) setIsElection(true);
            if (Number(tx) === 4) setIsElection(false);
            const status = getCurrentState(Number(tx))
            setElectionStatus(status);
        } catch (err) {
            console.error(err);
        }
    }
    
    async function fetchVotersList() {
        try {
            const voters = await contractMethod.methods.getVotersList().call();
            setVotersList(voters);
        } catch (err) {
            console.error(err);
        }
    }

    function handleChange(e) {
        setCitizenshipNo(e.target.value);
    }
    async function handleRegisterUsingCitizenship(e) {
        e.preventDefault();
        try {
            console.log(activeAddress)
            const tx = await contractMethod.methods.registerAsVoter(Number(citizenshipNo)).send({ from: activeAddress })
                .on('confirmation', () => {
                    console.log("tx");
                    console.log("Registered!");
                    setCitizenshipNo("");
                });
            console.log("Registration Res: ", tx)
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        const address = localStorage.getItem("activeAddress");
        setActiveAddress(JSON.parse(address));
        checkInitialState();

    }, [isElection, registrationStarted])
    return (
        <>

            <div className='voter-home'>
                <h1>Vote For Change</h1>
                <hr />
                <h2 className='pt'>Election Status: <span className='status'>{electionStatus}</span></h2>
                {registrationStarted ? <div>
                    <div>
                        <p><h3>Register Here</h3></p>
                    </div>

                    <form>
                        <input type='text' placeholder='Citizenship Number' onChange={handleChange} />
                        <button className='card-button' onClick={handleRegisterUsingCitizenship}>Register</button>
                    </form></div>
                    : isElection ? <CandidatesCard /> : "Wait for the election to start!"}
            </div>
        </>
    )
}

export default VoterHome