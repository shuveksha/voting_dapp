import React, { useEffect, useState } from 'react'
import { contractMethod } from '../../api/electionContract';
import { getCurrentState } from '../../utils/contract_utils';
const AdminHome = () => {
    const [electionStatus, setElectionStatus] = useState("Not Started")
    const [activeAddress, setActiveAddress] = useState("")
    const [votersList, setVotersList] = useState([]);
    const [contractState, setContractState] = useState(0);
    const [selectedVoter, setSelectedVoter] = useState(0);
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
                const tx = await contractMethod.methods.getNonApprovedVoters().call();
                setVotersList(tx);
                console.log(tx);
                setSelectedVoter(tx[0][0]);
            } catch (error) {
                console.log(error);
            }
        }
    }
    const shortenAddress = (address, chars = 4) => {
        return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
    };

    useEffect(() => {
        const address = localStorage.getItem("activeAddress");
        setActiveAddress(JSON.parse(address));
        checkInitialState();
        getVotersToApprove();
    }, [])


    const handleSelectChange = (e) => {
        const Candidate = e.target.value;
        const data = Candidate.split(",");
        const address = data[0];
        setSelectedVoter(address);
    }

    const handleApproveClick = async (e) => {
        try {
            e.preventDefault();
            const tx = await contractMethod.methods.approveVoters(selectedVoter).send({ from: activeAddress })
            console.log(tx);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
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
                {contractState < 3 && <div className='approve-voter'>
                    <h3>Pending Voter Approval</h3>
                    {/* <form>
                        <ul>
                            {votersList.map((voter, index) => (
                                <li key={index}>
                                    {voter} <button>Approve</button>
                                </li>
                            ))}
                        </ul>
                    </form> */}
                    <form>
                        <select onChange={handleSelectChange}>
                            {votersList.map((voter, index) => (
                                <option key={index} value={voter}>{shortenAddress(voter[0])}</option>
                            ))}
                        </select>
                        <button onClick={handleApproveClick} disabled={selectedVoter === 0}>Approve</button>
                    </form>

                </div>}
            </div>

        </>
    )
}

export default AdminHome