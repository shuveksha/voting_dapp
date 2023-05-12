import React, { useState } from 'react';
import './sidebar.css';



import { Link } from 'react-router-dom';



const Sidebar = () => {
  const [mobile,setmobile] = useState(true);
  const [show, setShow] = useState(false);

  return (
    <main className={show ? 'space-toggle' : null}>
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
        </div>
        <div className='headbar'>
        <label className='logo'>
           votingDapp
            </label>
         
          

        </div>
      </header>

      <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            <Link to='/' className='nav-homepage'>
              <i className={`fas fa-home-alt nav-homepage-icon`}></i>
              <span className='nav-homepage-name'>Homepage</span>
            </Link>

            <div className='nav-list'>
              <Link to='/AddCandidates  ' className='nav-link active'>
              <i class="fa-sharp fa-solid fa-plus nav-link-icon"></i>
             
                <span className='nav-link-name'>Add Candidates</span>
                
              </Link>
              <Link to='/candidates' className='nav-link'>
              <i class="fa-solid fa-people-line  nav-link-icon"></i>
                <span className='nav-link-name '>Candidates</span>
              </Link>

              <Link to='/results' className='nav-link'>
              <i class="fa-regular fa-square-poll-vertical nav-link-icon"></i>
                <span className='nav-link-name '>Results</span>
              </Link>


            

            </div>
          </div>

          <Link to='/logout' className='nav-link'>
            <i className='fas fa-sign-out nav-link-icon'></i>
            <span className='nav-link-name'>Logout</span>
          </Link>
        </nav>
      </aside>

      {/* navbar starts here */}
      <nav className='navbar'>
        <div className='container'>
        <label className='connect'>connect to wallet</label>
        <ul className='menu-links'>
        <Link to='/register' >
          <li>register as voter </li>

          </Link>

          <Link to='/register'>
          <li>end registration </li>

          </Link>

          <Link to='/register'>
          <li>start election</li>

          </Link>

          <Link to='/register'>
          <li>end election</li>

          </Link>
          

        </ul>
        <button className='mobile-menu-icon'>
       
          
        {mobile?<i class="fa-solid fa-xmark" /> :  <i class="fas fa-bars"></i>}
        </button>
        </div>




      </nav>
  
  


    </main>
  );
};

export default Sidebar;
