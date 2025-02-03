import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import './Register.css';

const Registration = () => {
  const { login } = useContext(AuthContext);

  const initialValues = {
    name: '',
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
    .required('Name is required')
    .min(4,'name must be at least 4 characters'),
    username: Yup.string()
      .required('Username is required')
      .min(4, 'Username must be at least 4 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });
  const handleRegistration = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      const response = await api.post('https://nt-shopping-list.onrender.com/api/users', {
        name: values.name,
        username: values.username,
        password: values.password
      });
      alert('Registration successful! Logging you in...');
      await login(values.username, values.password);
      resetForm();
    } catch (err) {
      setFieldError('general', err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegistration}
      >
        {({ isSubmitting, errors }) => (
          <Form className="register-form">
            <Field
              type="text"
              name="name"
              className="register-input"
              placeholder="Name"
            />
            <ErrorMessage name="name" component="div" className="register-error" />

            <Field
              type="text"
              name="username"
              className="register-input"
              placeholder="Username"
            />
            <ErrorMessage name="username" component="div" className="register-error" />

            <Field
              type="password"
              name="password"
              className="register-input"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" className="register-error" />

            {errors.general && <div className="register-error">{errors.general}</div>}

            <button
              className="register-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
