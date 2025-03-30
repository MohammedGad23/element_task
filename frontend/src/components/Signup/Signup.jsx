import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/authService';
import './signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);
  const [creationSuccess, setSuccess] = useState(null);


  // Move the validation schema inside the component
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be at most 50 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters'),

    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format')
      .max(255, 'Email is too long'),

    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),

    age: Yup.number()
      .required('Age is required')
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .min(18, 'You must be at least 18 years old')
      .max(120, 'Age is not valid'),

    phone_number: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10,}$/, 'Phone number must be more than 9 digits'),
  });

  useEffect(() => {
    let timeoutId;
    if (creationSuccess) {
      timeoutId = setTimeout(() => {
      }, 2000); // 2 seconds delay
    }

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [creationSuccess, navigate]);

  // Custom Password Field Component
  const PasswordField = ({ 
    name, 
    label, 
    touched, 
    errors, 
    className 
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="form-group password-field">
        <label htmlFor={name}>{label}</label>
        <div className="password-input-wrapper">
          <Field 
            type={showPassword ? "text" : "password"}
            name={name}
            className={`form-control ${
              touched[name] && errors[name] ? 'is-invalid' : ''
            } ${className}`}
          />
          <button 
            type="button"
            className="password-toggle-btn"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>
        {touched[name] && errors[name] && (
          <div className="error-message">
            {errors[name]}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Reset previous messages
      setSignupError(null);
      setSuccess(null);
      
      // Prepare signup data
      const signupData = {
        name: values.name,
        email: values.email,
        password: values.password,
        age: values.age,
        phone_number: values.phone_number,
        role: values.role || 'user'
      };

      // Call signup service
      const response = await AuthService.signup(signupData);
      
      // Handle successful signup
      setSuccess('Creation successful.');
      
      // Optional: Reset form
      // resetForm();

    } catch (error) {
      // Handle signup error
      const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
      setSignupError(errorMessage);
      console.error('Signup error', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          age: '',
          phone_number: '',
          role: 'user'
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="signup-form">
            {/* Global Error Message */}
            {signupError && (
              <div className="global-error-message">
                {signupError}
              </div>
            )}

            {/* Success Message */}
            {creationSuccess && (
              <div className="global-success-message">
                {creationSuccess}
              </div>
            )}


            <div className='row'>
              <div className='col-lg-6 col-md-6'>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <Field 
                    type="text" 
                    name="name" 
                    className={`form-control ${
                      touched.name && errors.name ? 'is-invalid' : ''
                    }`}
                  />
                  {touched.name && errors.name && (
                    <div className="error-message">
                      {errors.name}
                    </div>
                  )}
                </div>
              </div>
              
              <div className='col-lg-6 col-md-6'>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field 
                    type="email" 
                    name="email" 
                    className={`form-control ${
                      touched.email && errors.email ? 'is-invalid' : ''
                    }`}
                  />
                  {touched.email && errors.email && (
                    <div className="error-message">
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>
               
              <div className='col-lg-6 col-md-6'>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <Field 
                    type="number" 
                    name="age" 
                    className={`form-control ${
                      touched.age && errors.age ? 'is-invalid' : ''
                    }`}
                  />
                  {touched.age && errors.age && (
                    <div className="error-message">
                      {errors.age}
                    </div>
                  )}
                </div>
              </div>
              
              <div className='col-lg-6 col-md-6'>
                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <Field 
                    type="tel" 
                    name="phone_number" 
                    className={`form-control ${
                      touched.phone_number && errors.phone_number ? 'is-invalid' : ''
                    }`}
                  />
                  {touched.phone_number && errors.phone_number && (
                    <div className="error-message">
                      {errors.phone_number}
                    </div>
                  )}
                </div> 
              </div>
              
              <div className='col-lg-6 col-md-6'>
                <PasswordField 
                  name="password"
                  label="Password"
                  touched={touched}
                  errors={errors}
                />
              </div>
              
              <div className='col-lg-6 col-md-6'>
                <PasswordField 
                  name="confirmPassword"
                  label="Confirm Password"
                  touched={touched}
                  errors={errors}
                />
              </div>
            </div>           

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Signing Up...' : 'Create User'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;