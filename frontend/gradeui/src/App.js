import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/signup/" element={<SignupPage />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        {/* <Route path="/logout/" element={<Logout />} /> */}
      </Routes>
    </div >
  );
}

export default App;