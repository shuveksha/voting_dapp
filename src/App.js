import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCandidate from './pages/Admin/AddCandidate';
import AdminHome from './pages/Admin/AdminHome';
import Results from './pages/Results';
import VoterHome from './pages/Voter/VoterHome';
import Home from './pages/User/Home';
import Sidebar from './components/Sidebar/SideBar';
import AddedCandidates from './components/AddedCandidates';
import { useState } from 'react';

function App() {
  const [isOwner, setIsOwner] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar isOwner={isOwner} setIsOwner={setIsOwner} />
        <Routes>
          {/* user route  */}
          <Route path='/' element={<Home isOwner={isOwner} setIsOwner={setIsOwner} />} />
          {/* user route  */}
          <Route path='/AddCandidate' element={<AddCandidate />} />
          <Route path='/AdminHome' element={<AdminHome />} />
          <Route path='/Results' element={<Results />} />
          <Route path='/VoterHome' element={<VoterHome />} />
          <Route path='/candidates' element={<AddedCandidates />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
