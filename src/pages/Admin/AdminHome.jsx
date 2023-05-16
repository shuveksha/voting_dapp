import React, { useEffect, useState } from 'react'
import { contractMethod } from '../../api/electionContract';
import { getCurrentState } from '../../utils/contract_utils';
const AdminHome = () => {
    const [electionStatus, setElectionStatus] = useState("Not Started")
    const [activeAddress, setActiveAddress] = useState("")
    const [votersList, setVotersList] = useState([]);
    const [contractState, setContractState] = useState(0);
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
            setContractState(Number(tx));
            console.log(tx);
            const status = getCurrentState(Number(tx))
            setElectionStatus(status)
        } catch (err) {
            console.error(err);
        }
    }
    async function getVotersToApprove() {
        if (contractState < 3) {
            try {
                const tx = await contractMethod.methods.getVoters().call();
                setVotersList(tx);
                console.log(tx);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // async function approveVoter(address) {
    //     try {
    //         await contractMethod.methods.approveVoter(address).send({ from: activeAddress });
    //         const voters = await contractMethod.methods.getVotersToApprove().call();
    //         const approved = await contractMethod.methods.getApprovedVoters().call();
    //         setVotersToApprove(voters);
    //         setApprovedVoters(approved);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }      

    useEffect(() => {
        const address = localStorage.getItem("activeAddress");
        setActiveAddress(JSON.parse(address));
        checkInitialState();
        getVotersToApprove();
    }, [])

    // const RegisteredVotersDropdown = () => {
    //     const [votersList, setVotersList] = useState([]);

    //     useEffect(() => {
    //       async function fetchVoters() {
    //         try {
    //           const voters = await contractMethod.methods.getVoters().call();
    //           setVotersList(voters);
    //         } catch (error) {
    //           console.error(error);
    //         }
    //       }
    //       fetchVoters();
    //     }, []);


    //   }
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
                {contractState < 3 && <div className='approve-voters'>
                    <h3>Pending Voter Approval</h3>
                    <form>
                        <ul>
                            {votersList.map((voter, index) => (
                                <li key={index}>
                                    {voter} <button>Approve</button>
                                </li>
                            ))}
                        </ul>
                    </form>

                </div>}
            </div>

        </>
    )
}

export default AdminHome