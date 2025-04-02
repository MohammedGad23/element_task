import React, { useState } from 'react';
import './mainpage.css';
// import { useNavigate } from 'react-router-dom';
import Signup from '../Signup/Signup';
import LendingBook from '../LendBook/LendBook'
import ReturnBook from '../ReturnBook/ReturnBook';

const Mainpage = () => {
   const [addUser, setAddUser] = useState(false);
   const [lendBook, setLendBook] = useState(false);
   const [returnBook, setReturnBook] = useState(false);



  const createUser = () => {
     setAddUser(true);
     setLendBook(false);
    setReturnBook(false);

   };

  const handleCloseSignup = () => {
     setAddUser(false);
   };

  const lendingBook = () => {
    setLendBook(true);
    setAddUser(false);
    setReturnBook(false);

  };

  const handleCloseLending = () => {
    setLendBook(false);
  };

  const returnBookToSt = () => {
    setReturnBook(true);
    setAddUser(false);
    setLendBook(false);
  };

  const handleClosereturn = () => {
    setReturnBook(false);
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
           onClick={lendingBook}
         >
           Lending
         </button>

         <button 
           className='submit-button11'
           style={{backgroundColor: '#FF750F'}}
           onClick={returnBookToSt}
         >
           Report & Return
         </button>
       </div>

       {/* Conditional Rendering */}
       {addUser && (
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
       )}
       {lendBook && (
           <div className="signup-modal-content">
             <button 
               className="close-button" 
               onClick={handleCloseLending}
             >
               &times;
             </button>
             <LendingBook 
               initialMode="modal" 
               onCancel={handleCloseLending}
             />
           </div>
       )}
       {returnBook && (
           <div className="signup-modal-content">
             <button 
               className="close-button" 
               onClick={handleClosereturn}
             >
               &times;
             </button>
             <ReturnBook 
               initialMode="modal" 
               onCancel={handleClosereturn}
             />
           </div>
       )}
     </div>
   );
};

export default Mainpage;