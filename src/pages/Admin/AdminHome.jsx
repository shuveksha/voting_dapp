import React from 'react'

const AdminHome = () => {
  return (
    <>
            <div className='admin-home'>
                <h1>Admin Home</h1>
                <hr/>
                <h2>Election States</h2>
                <div className='election-states'>
                    <button>Election Starts</button>
                    <button>Election Ends</button><br/>
                    <button>Registration Starts</button>
                    <button>Registration Ends</button>
                </div>
            </div>
            <div className='approve-voter'>
            <form>
                <select>
                    <option>Voter to Approve 1</option>
                    <option>Voter to Approve 2</option>
                    <option>Voter to Approve 3</option>
                </select>
                <button>Approve</button>
            </form>
        </div>
    </>
  )
}

export default AdminHome