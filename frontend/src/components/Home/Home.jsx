import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Create a CSS file for styling

const Home = () => {
  const navigate = useNavigate(); // Use React Router's navigation hook

  const handleLogin = () => {
    navigate('/login'); // Use React Router navigation
  };

//   const handleSignup = () => {
//     navigate('/signup'); // Add signup navigation
//   };

  return (
      <div className="home-container1">
      <h1 className="title">Welcome to Book Store</h1>
      <p className="sub-title">
        Discover a world of books, stories, and knowledge.
        read and enrich your life. get inspired and learn.
        
      </p>

      <div className="button-container">
        <button 
          className="login-button1" 
          style={{backgroundColor: '#FF750F'}}
          onClick={handleLogin}
        >
          Login
        </button>

        {/* <button 
          className="signup-button"
          onClick={handleSignup}
        >
          SignUp
        </button> */}
      </div>
    </div>
  );
};

export default Home;