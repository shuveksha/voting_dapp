import React, { useEffect, useState } from 'react'
import { contractMethod } from '../../api/electionContract';
import { getCurrentState } from '../../utils/contract_utils';

const ApproveVoter = () => {
  const [votersList, setVotersList] = useState([]);
  const [electionStatus, setElectionStatus] = useState([]);
  const [activeAddress, setActiveAddress] = useState("")
  const [contractState, setContractState] = useState([]);
  const [selectedVoter, setSelectedVoter] = useState([]);

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

useEffect(() => {
    const address = localStorage.getItem("activeAddress");
    setActiveAddress(JSON.parse(address));
    checkInitialState();
    getVotersToApprove();
}, [])


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
    <div className='approve-voter'>
      <h1>Approve Voter</h1>
      <hr />
      <br />
      <table>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Voter ID</th>
            <th>Approve Voter</th>
          </tr>
        </thead>
        <tbody>
          {votersList.map((voter, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{voter}</td>
              <td><button onClick={handleApproveClick} disabled={selectedVoter === 0}>Approve</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveVoter