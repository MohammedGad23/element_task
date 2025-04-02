import React, { useState, useEffect } from 'react';
import AuthService from '../../Services/authService'; // Adjust the import path as needed
import BookService from '../../Services/bookService'; // For fetching book data
import './returnBook.css';

const ReturnBook = () => {
  const [lendingInfo, setLendingInfo] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [idBookLend, setIdBook] = useState(null);
  

  // Fetch the lending information when the component loads
  useEffect(() => {
    const fetchLendingInfo = async () => {
      try {
        const response = await BookService.getLendingInfo(); 
        setLendingInfo(response.data.data); 
        setIdBook(response.data.data.book.id);
      } catch (error) {
        setError('The Book Not Lended To Return');
      }
    };

    fetchLendingInfo();
  }, []);

  const handleReturnBook = async () => {
    // Logic to return the book
    try {
      setError(null);
      setSuccess(null);

      console.log(idBookLend);

      await BookService.returnBook(idBookLend);
      setSuccess('Book lent successfully!');
      
    } catch (error) {
      setError('Book Not Lended To Return');
    }
  };

  return (
    <div className="return-book-container">
      <div className='return_book'>
        {error && (
          <div className="global-error-message">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="global-success-message">
            {success}
          </div>
        )}


        {lendingInfo ? (
          <div className="lending-info">
            <div className="user-info">
              <h3>User Information</h3>
              <p><strong>Name:</strong> {lendingInfo.user.name}</p>
              <p><strong>Email:</strong> {lendingInfo.user.email}</p>
              <p><strong>Phone Number:</strong> {lendingInfo.user.phone_number}</p>
            </div>

            <div className="book-info">
              <h3>Book Information</h3>
              <p><strong>Lending Date:</strong> {lendingInfo.book.lending_date}</p>
              <p><strong>Return Date:</strong> {lendingInfo.book.return_date}</p>
            </div>
          </div>
        ) : (
          <p>No Lending Book Info.</p>
        )}

        <button type="submit" className="submit-button" onClick={handleReturnBook}>
          Return Book
        </button>
      </div>
    </div>
  );
};

export default ReturnBook;