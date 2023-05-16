import React, { useEffect, useState } from 'react';
import './SideBar.css';
import { NavLink } from 'react-router-dom';
import { contractMethod } from '../../api/electionContract';
import { getUserActiveAddress } from '../../utils/contract_utils';

const Sidebar = ({ isOwner, setIsOwner }) => {
    const [mobile, setmobile] = useState(true);
    const [show, setShow] = useState(false);
    const [activeAddress, setActiveAddress] = useState("");

    async function checkIsOwner() {
        try {
            await contractMethod.methods.getOwner().call((error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    if (activeAddress === result) {
                        setIsOwner(true);
                    }
                }
            });

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        async function getAddress() {
            const address = await getUserActiveAddress();
            setActiveAddress(address);
        }
        getAddress();
    }, []);
    useEffect(() => {
        checkIsOwner();
    }, [activeAddress]);
    const handleLogout = (e) => {
        // localStorage.clear();
        // window.reload();
    }
    return (
        <>

            <main className={show ? 'space-toggle' : null}>
                <header className={`header ${show ? 'space-toggle' : null}`}>
                    <div className='header-toggle' onClick={() => setShow(!show)}>
                        <i className={`fas fa-bars ${show ? 'fas fa-times' : null}`}></i>
                    </div>
                    {/* <div className='headbar'>
                        <label className='logo'>
                            Welcome
                        </label>
                    </div> */}
                </header>

                <aside className={`sidebar show`}>
                    <nav className='nav'>
                        <div>
                            <NavLink to='/' className='nav-link' end>
                                <i className={`fas fa-home nav-link-icon`}></i>
                                <span className='nav-link-name'>Homepage</span>
                            </NavLink>

                            <div className='nav-list'>
                                {isOwner && <NavLink to='/AdminHome' className='nav-link'>
                                    <i className="fas fa-user nav-link-icon"></i>
                                    <span className='nav-link-name'>Admin</span>
                                </NavLink>}
                                {isOwner && (
                                    <NavLink to='/AddCandidate' className='nav-link subheading'>
                                        <i className="fas fa-plus subheading-icon"></i>
                                        <span className='subheading-text'>Add Candidates</span>
                                    </NavLink>
                                )}
                                <NavLink to='/VoterHome' className='nav-link'>
                                    <i className="fas fa-check-to-slot nav-link-icon"></i>
                                    <span className='nav-link-name '>Vote</span>
                                </NavLink>
                                <NavLink to='/candidates' className='nav-link'>
                                    <i className="fas fa-users nav-link-icon"></i>
                                    <span className='nav-link-name '>Candidates</span>
                                </NavLink>
                                {isOwner && <NavLink to='/ApproveVoter' className='nav-link'>
                                    <i className="fas fa-user-plus nav-link-icon"></i>
                                    <span className='nav-link-name '>Approve Voters</span>
                                </NavLink>}
                                <NavLink to='/Results' className='nav-link'>
                                    <i className="fas fa-poll nav-link-icon"></i>
                                    <span className='nav-link-name '>Results</span>
                                </NavLink>
                            </div>
                            
                        </div>

                        <NavLink to='/logout' className='nav-link'>
                            <i className='fas fa-sign-out-alt nav-link-icon' onClick={handleLogout}></i>
                            <span className='nav-link-name'>Logout</span>
                        </NavLink>
                    </nav>
                </aside>

                {/* navbar starts here  */}
                {/* <nav className='navbar'>
                    <div className='container'>
                        <label className='connect'>connect to wallet</label>
                        <ul className='menu-links'>
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
                            {mobile ? <i className="fas fa-times" /> : <i className="fas fa-bars"></i>}
                        </button>
                    </div>
                </nav> */}




            </main>
        </>
    );
};

export default Sidebar;