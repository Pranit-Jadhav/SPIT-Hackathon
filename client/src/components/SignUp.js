import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    email: '',
    password: '',
    rePassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      alert('Passwords do not match!');
      return;
    }
    // Add your signup logic here
    console.log('Sign Up:', formData);
    // navigate('/login'); // Navigate after successful signup
  };

  return (
    <section className="wrapper">
      <div className="login-card bg-white p-5 shadow rounded" style={{ width: '380px' }}>
        <div className="logo mb-3 text-center">
          <img src="/images/mlogo.png" className="img-fluid" style={{ width: '160px' }} alt="Logo" />
        </div>

        <h3 className="text-dark fw-bold fs-4 mb-4 text-center">Create Account</h3>

        <div className="text-center text-muted mb-3">
          Already Registered?
          <Link
            to="/login"
            className="text-primary fw-bold text-decoration-none"
          >
            Login Here
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/* LOGIN ID */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="loginId"
              placeholder="Login ID"
              value={formData.loginId}
              onChange={handleChange}
              required
            />
            <label htmlFor="loginId">Enter Login ID</label>
          </div>

          {/* EMAIL */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Enter Email ID</label>
          </div>

          {/* PASSWORD */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Enter Password</label>
          </div>

          {/* RE-ENTER PASSWORD */}
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="rePassword"
              placeholder="Re-enter Password"
              value={formData.rePassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="rePassword">Re-enter Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;

