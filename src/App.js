import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AddCandidate from './pages/Admin/AddCandidate';
// user route 
import Home from './pages/User/Home';
// user route 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* user route  */}
          <Route path='/' element={<Home/>} />
          {/* user route  */}

          <Route path='/AddCandidate' element={<AddCandidate/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
