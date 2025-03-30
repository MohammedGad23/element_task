import React, { useState } from 'react';
import './mainpage.css';
import { useNavigate } from 'react-router-dom';
import Signup from '../Signup/Signup';

const Mainpage = () => {
   const navigate = useNavigate();
   const [addUser, setAddUser] = useState(false);

   const createUser = () => {
     setAddUser(true);
   };

   const handleCloseSignup = () => {
     setAddUser(false);
   };

   return (
     <div className="home-container">
       <h1 className="title">Welcome to Book Store</h1>
       <p className="sub-title">
         Discover a world of books, stories, and knowledge.
         Read and enrich your life. Get inspired and learn.
       </p>

       <div className="button-container1">
         <button 
           className='submit-button11'
           style={{backgroundColor: '#FF750F'}}
           onClick={createUser}
         >
           Add User
         </button> 
         
         <button 
           className='submit-button11'
           style={{backgroundColor: '#FF750F'}}
         >
           Lending
         </button>

         <button 
           className='submit-button11'
           style={{backgroundColor: '#FF750F'}}
         >
           Return
         </button>

         <button 
           className='submit-button11'
           style={{backgroundColor: '#FF750F'}}
         >
           Review
         </button>
       </div>

       {/* Conditional Rendering */}
       {addUser && (
         <div className="signup-modal-overlay">
           <div className="signup-modal-content">
             <button 
               className="close-button" 
               onClick={handleCloseSignup}
             >
               &times;
             </button>
             <Signup 
               initialMode="modal" 
               onCancel={handleCloseSignup}
             />
           </div>
         </div>
       )}
     </div>
   );
};

export default Mainpage;