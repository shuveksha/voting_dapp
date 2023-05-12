import React, { useState } from 'react';
import './SideBar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [mobile, setmobile] = useState(true);
    const [show, setShow] = useState(false);

    return (
        <main className={show ? 'space-toggle' : null}>
            <header className={`header ${show ? 'space-toggle' : null}`}>
                <div className='header-toggle' onClick={() => setShow(!show)}>
                    <i className={`fas fa-bars ${show ? 'fas fa-times' : null}`}></i>
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
                        <NavLink to='/' className='nav-link' end>
                            <i className={`fas fa-home nav-link-icon`}></i>
                            <span className='nav-link-name'>Homepage</span>
                        </NavLink>

                        <div className='nav-list'>
                            <NavLink to='/AddCandidates' className='nav-link active'>
                                <i class="fas fa-plus nav-link-icon"></i>
                                <span className='nav-link-name'>Add Candidates</span>
                            </NavLink>
                            <NavLink to='/candidates' className='nav-link'>
                                <i class="fas fa-users nav-link-icon"></i>
                                <span className='nav-link-name '>Candidates</span>
                            </NavLink>

                            <NavLink to='/results' className='nav-link'>
                                <i class="fas fa-poll nav-link-icon"></i>
                                <span className='nav-link-name '>Results</span>
                            </NavLink>
                        </div>
                    </div>

                    <NavLink to='/logout' className='nav-link'>
                        <i className='fas fa-sign-out-alt nav-link-icon'></i>
                        <span className='nav-link-name'>Logout</span>
                    </NavLink>
                </nav>
            </aside>

            {/* navbar starts here */}
            <nav className='navbar'>
                <div className='container'>
                    <label className='connect'>connect to wallet</label>
                    <ul className='menu-links'>
                        {/* Uncomment these links when you're ready */}
                        <NavLink to='/register' >
                            <li>register as voter </li>
                        </NavLink>
                        <NavLink to='/register'>
                            <li>end registration </li>
                        </NavLink>
                        <NavLink to='/register'>
                            <li>start election</li>
                        </NavLink>
                        <NavLink to='/register'>
                            <li>end election</li>
                        </NavLink>
                    </ul>
                    <button className='mobile-menu-icon'>
                        {mobile ? <i class="fas fa-times" /> : <i class="fas fa-bars"></i>}
                    </button>

                </div>




            </nav>




        </main>
    );
};

export default Sidebar;