import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
  const { login, user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/home" />;
  }

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
    .required('Username is required')
    .min(4, 'Password must be at least 4 characters'),
    password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  });
  // iqbol0797 I030797
  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      await login(values.username, values.password);
    } catch (err) {
      setFieldError('general', 'Invalid username or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="form-error"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="form-error"
                />
              </div>
              {errors.general && (
                <div className="form-error general-error">
                  {errors.general}
                </div>
              )}
              <button
                type="submit"
                className="btn login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <p className="register-prompt">
          No account yet?{' '}
          <Link to="/register" className="register-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
