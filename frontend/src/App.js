// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login'; // Create this component
import Signup from './components/Signup/Signup'; // Create this component
import Mainpage from './components/Mainpage/Mainpage';
import ProtectedRoute from './Services/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
         {/* Public Routes */}
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<Mainpage />} />
            <Route path="/addUser" element={<Signup />} />
          </Route>
          {/* Redirect to login for unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;