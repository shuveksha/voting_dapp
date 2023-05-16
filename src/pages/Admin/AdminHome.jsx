import React, { useEffect, useState } from 'react'
import { contractMethod } from '../../api/electionContract';
import { getCurrentState } from '../../utils/contract_utils';
const AdminHome = () => {
    const [electionStatus, setElectionStatus] = useState("Not Started")
    const [activeAddress, setActiveAddress] = useState("")
    const [votersList, setVotersList] = useState([]);
    const [votersToApprove, setVotersToApprove] = useState([]);
    const [approvedVoters, setApprovedVoters] = useState([]);
    const startRegistration = async (e) => {
        e.preventDefault();
        try {
            const tx = await contractMethod.methods.startRegistration().send({ from: activeAddress })
                .on('confirmation', () => {
                    setElectionStatus("Registration Started!")
                });
            console.log("startRegistration Res: ", tx)
        } catch (err) {
            console.error(err);
        }
    }

    const endRegistration = async (e) => {
        e.preventDefault();
        try {
            const tx = await contractMethod.methods.endRegistration().send({ from: activeAddress })
                .on('confirmation', () => {
                    setElectionStatus("Registration Ended!")

                });
            console.log("endRegistration Res: ", tx)
        } catch (err) {
            console.error(err);
        }
    }

    const startElection = async (e) => {
        e.preventDefault();
        try {
            const tx = await contractMethod.methods.startElection().send({ from: activeAddress })
                .on('confirmation', () => {
                    setElectionStatus("Election Started!")
                });
            console.log("startElection Res: ", tx)
        } catch (err) {
            console.error(err);
        }
    }

    const endElection = async (e) => {
        e.preventDefault();
        try {
            const tx = await contractMethod.methods.endElection().send({ from: activeAddress })
                .on('confirmation', () => {
                    setElectionStatus("Election Ended!")
                });
            console.log("endElection Res: ", tx)
        } catch (err) {
            console.error(err);
        }
    }
    async function checkInitialState() {
        try {
            const tx = await contractMethod.methods.getCurrentState().call();
            console.log(tx);
            const status = getCurrentState(Number(tx))
            setElectionStatus(status)
        } catch (err) {
            console.error(err);
        }
    }
    async function getCandidatesToApprove() {
        try {
            const tx = await contractMethod.methods.ge
        } catch (error) {

        }
    }     

    useEffect(() => {
        const address = localStorage.getItem("activeAddress");
        setActiveAddress(JSON.parse(address));
        checkInitialState();
        getCandidatesToApprove();
    }, [])


      
    return (
        <>
            <div className='admin-home'>
                <h1>Admin Home</h1>
                <hr />
                <h2 className='pt'>Election Status:<span className='status'> {electionStatus}</span></h2>
                <div className='election-states'>
                    <button onClick={startRegistration}>Registration Starts</button>
                    <button onClick={endRegistration}>Registration Ends</button><br />
                    <button onClick={startElection}>Election Starts</button>
                    <button onClick={endElection}>Election Ends</button>
                </div>
            </div>
            
        </>
    )
}

export default AdminHome