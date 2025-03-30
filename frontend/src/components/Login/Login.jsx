import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/authService.js';
import './login.css';

// Validation Schema
const LoginSchema = Yup.object().shape({
  user: Yup.string()
    .required('Account or email is required')
    .min(3, 'Account or email must be at least 3 characters long'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
});

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoginError(null);
         await AuthService.login({
        email: values.user,
        password: values.password
      });
      navigate('/main');
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={{
          user: '',
          password: ''
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="login-form">
            <h2>Login</h2>
            
            {/* Login Error Message */}
            {loginError && (
              <div className="global-error-message">
                {loginError}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="user">Account or Email</label>
              <Field 
                type="text" 
                name="user" 
                className={`form-control ${
                  touched.user && errors.user ? 'is-invalid' : ''
                }`}
              />
              {touched.user && errors.user && (
                <div className="error-message">
                  {errors.user}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field 
                type="password" 
                name="password" 
                className={`form-control ${
                  touched.password && errors.password ? 'is-invalid' : ''
                }`}
              />
              {touched.password && errors.password && (
                <div className="error-message">
                  {errors.password}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <p className="signup-link">
              Don't have an account? 
              <button 
                type="button" 
                onClick={() => navigate('/signup')}
                className="signup-button"
              >
                Sign Up
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;