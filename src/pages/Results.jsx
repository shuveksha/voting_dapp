import React, { useEffect, useState } from 'react';
import { contractMethod } from '../api/electionContract';

const Results = () => {
  const [winningCandidate, setWinningCandidate] = useState({});
  const [otherCandidate, setOtherCandidate] = useState([]);
  const [electionEnded, setElectionEnded] = useState(true)
  console.log(winningCandidate);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = await contractMethod.methods.getCurrentState().call();
        if (Number(state) === 4) setElectionEnded(true);


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

    <div>
      {electionEnded ?

        <div className='result'>
          <h1>winning candidate</h1>
          <hr />
          <table>
            <thead>
              <tr>
              <th>Party ID</th>
              <th>Candidate Name</th>
              <th>Vote Count</th>

              </tr>
              <tr>
                
                <td>{winningCandidate.partyId}</td>
                <td>{winningCandidate.candidateName}</td>
                <td>{winningCandidate.candidateVoteCount}</td>
              </tr>
            </thead>
          </table>
          <hr/>

          {/* // table other candidats */}
          <h1>other candidates</h1>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Party ID</th>
                <th>Candidate Name</th>
                <th>Vote Count</th>
              </tr>
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

          :null  }
          {!electionEnded && <div className='loading'>
          <div className='.loading-text'>Wait for election to end</div>
          </div> }
    </div>
  )
}

export default Results