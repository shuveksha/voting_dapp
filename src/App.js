import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AddCandidate from './pages/Admin/AddCandidate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/AddCandidate' element={<AddCandidate/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
