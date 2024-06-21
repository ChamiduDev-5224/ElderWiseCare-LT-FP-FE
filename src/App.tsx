
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home'
import Signup from './components/signup/Signup';
import { Login } from './components/login/Login';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />

      </Routes>
    </Router>
  )
}

export default App
