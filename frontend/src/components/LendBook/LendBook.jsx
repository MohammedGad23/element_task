import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
import BookService from '../../Services/bookService'; // Adjust the import path as needed
import './lendBook.css';

const LendingBook = () => {
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all users when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await BookService.getAllUsers(); // Implement this method in AuthService
        const formattedUsers = response.data.data.map(user => ({
          id: user.id,
          name: user.name
        }));
        setUsers(formattedUsers);

      } catch (error) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Validation Schema for Lending Form
  const LendingSchema = Yup.object().shape({
    user_id: Yup.string().required('User is required'),
    lend_date: Yup.date()
    .default(() => new Date()) // Sets the default to the current date
    .required('Lend date is required'),
    return_date: Yup.date()
    .required('Return date is required')
    .min(Yup.ref('lend_date'), 'Return date must be after lend date'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      setSuccess(null);

      // Call the lending service
      console.log(values);
      const response = await BookService.lendingBook(values);
      setSuccess('Book lent successfully!');
      
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lend-book-container">
      {/* <h2>Lend a Book</h2> */}
      {/* {error && <div className="error-message">{error}</div>} */}
      {/* {success && <div className="success-message">{success}</div>} */}

      <Formik
        initialValues={{
          user_id: '',
          lend_date: new Date().toISOString().split('T')[0],
          return_date: '',
        }}
        validationSchema={LendingSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="l-form">
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

            <div className='row'>
            <div className='col-lg-6 col-md-6'>
              <div className="form-group">
                <label htmlFor="user_id">Select User</label>
                <Field as="select" name="user_id" className={`form-control ${touched.user_id && errors.user_id ? 'is-invalid' : ''}`}>
                  <option value="">Select a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} 
                      {/* ({user.email}) */}
                    </option>
                  ))}
                </Field>
                {touched.user_id && errors.user_id && (
                  <div className="error-message">{errors.user_id}</div>
                )}
              </div>
            </div>
              <div className='col-lg-6 col-md-6'>
                <div className="form-group">
                  <label htmlFor="lend_date">Lend Date</label>
                  <Field 
                    type="date" 
                    name="lend_date" 
                    className={`form-control ${touched.lend_date && errors.lend_date ? 'is-invalid' : ''}`} 
                    value={new Date().toISOString().split('T')[0]}
                    disabled
                  />
                  {touched.lend_date && errors.lend_date && (
                    <div className="error-message">{errors.lend_date}</div>
                  )}
                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className="form-group">
                  <label htmlFor="return_date">Return Date</label>
                  <Field 
                    type="date" 
                    name="return_date" 
                    className={`form-control ${touched.return_date && errors.return_date ? 'is-invalid' : ''}`} 
                  />
                  {touched.return_date && errors.return_date && (
                    <div className="error-message">{errors.return_date}</div>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              {isSubmitting ? 'Lending...' : 'Lend Book'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LendingBook;