import React, { useState } from 'react';
import { contractMethod } from '../../api/electionContract';

export async function getRegisteredVoters() {
  try {
    const voters = await contractMethod.methods.getRegisteredVoters().call();
    return voters;
  } catch (error) {
    console.error(error);
    return [];
  }
}
const ApproveVoter = () => {
  const [citizenshipNumber, setCitizenshipNumber] = useState('');
  const [votersList, setVotersList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setCitizenshipNumber(e.target.value);
  };

  const handleFetchVoters = async () => {
    try {
      const voters = await contractMethod.methods.getVoters().call();
      setVotersList(voters);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='approve-voter'>
      <h1>Add Voter</h1>
      <hr />
      <br />
      <table>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Citizenship Number</th>
            <th>Status</th>
            <th>Approve Voter</th>
          </tr>
        </thead>
        <tbody>
          {votersList.map((voter, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{voter}</td>
              <td>{voter.status}</td>
              <td><button className='ApproveVoter' type='button' onClick={handleSubmit}c>Approve</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveVoter;
