
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home'
import Signup from './components/signup/Signup';
import { Login } from './components/login/Login';
import { Provider } from 'react-redux';
import { Store } from './redux/Store';
function App() {

  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />

        </Routes>
      </Router>
    </Provider>
  )
}

export default App
