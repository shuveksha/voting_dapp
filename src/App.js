import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCandidate from './pages/Admin/AddCandidate';
import AdminHome from './pages/Admin/AdminHome';
import Results from './pages/Results';
import VoterHome from './pages/Voter/VoterHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/AddCandidate' element={<AddCandidate />} />
          <Route path='/AdminHome' element={<AdminHome />} />
          <Route path='/Results' element={<Results />} />
          <Route path='/VoterHome' element={<VoterHome />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
