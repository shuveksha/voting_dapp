import React from 'react'

const AddCandidate = () => {
  return (
    <div className='add-candidate'>
       <h1>Add Candidates</h1>
       <hr/>
       <form>
        <input type='text' placeholder='Candidate Name'/> 
        <input type='text' placeholder='Party ID'/> 
        <input type='text' placeholder='URI'/> 
        <button>Add Candidate</button>
       </form> 
    </div>
  )
}

export default AddCandidate