import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AddCandidate from './pages/Admin/AddCandidate';
import AdminHome from './pages/Admin/AdminHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/AddCandidate' element={<AddCandidate/>}/>
          <Route path='/AdminHome' element={<AdminHome/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
