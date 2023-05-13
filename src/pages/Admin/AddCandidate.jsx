import React, { useEffect, useState } from 'react';
import { contractMethod } from '../../api/electionContract';

const AddCandidate = () => {
  const[activeAddress, setActiveAddress] = useState('');
  const[candidateName, setCandidateName] = useState('');
  const[partyId, setPartyId] = useState(0);
  const[uri, setUri] = useState('');

  useEffect(()=>{
    const address = localStorage.getItem("activeAddress");
    setActiveAddress(JSON.parse(address));
  },[])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      await contractMethod.methods.addCandidates(candidateName,partyId,uri).send({from: activeAddress})
    }catch(error){
      console.error(error);
    }
  }
  return (
    <div className='add-candidate'>
       <h1>Add Candidates</h1>
       <hr/>
       <form>
        <input type='text'  placeholder='Candidate Name' value={candidateName} onChange={(e)=>setCandidateName(e.target.value)}/> 
        <input type='number' placeholder='Party ID' value={partyId === 0 ? '' : partyId} onChange={(e)=>{setPartyId(parseInt(e.target.value))}} /> 
        <input type='text' placeholder='URI' value={uri} onChange={(e)=>{setUri(e.target.value)}}/> 
        <button onClick={handleSubmit}>Add Candidate</button>
       </form> 
    </div>
  )
}

export default AddCandidate