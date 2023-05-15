import React,{useEffect,useState} from 'react';
import { contractMethod } from '../api/electionContract';
const Results = () => {
  const [winningCandidate, setWinningCandidate] = useState({});
  const [otherCandidate, setOtherCandidate] = useState([]);
  console.log(winningCandidate);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contractMethod.methods.checkResults().call();
        setWinningCandidate(result);
       

        const finalStats = await contractMethod.methods.getFinalStats().call();
        setOtherCandidate(finalStats);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchData();

    
  }, []);

  
  return (
 
  
    <div className='result'>
        <h1>Results</h1>
        <hr/>
        <table>
            <thead>
                <tr>
                    <th>Party ID</th>
                    <th>Candidate Name</th>
                    <th>Vote Count</th>
                </tr>
                {/* winningCandidate here */}
                <tr>
                <td>{winningCandidate.partyId}</td>
            <td>{winningCandidate.candidateName}</td>
            <td>{winningCandidate.candidateVoteCount}</td>
            </tr>

      {/* other candidate here */}
            {otherCandidate.map((candidate, index) => (
              
            <tr key={index}>
              <td>{candidate.partyId}</td>
              <td>{candidate.candidateName}</td>
              <td>{candidate.candidateVoteCount}</td>
            </tr>
          ))}


            </thead>
        </table>
        <tbody>

        </tbody>
    </div>
  )
}

export default Results