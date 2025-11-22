import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login:', { loginId, password });
    // navigate('/dashboard'); // Navigate after successful login
  };

  return (
    <section className="wrapper">
      <div className="login-card bg-white p-5 shadow rounded" style={{ width: '380px' }}>
        <div className="logo mb-3 text-center">
          <img src="/images/mlogo.png" className="img-fluid" style={{ width: '160px' }} alt="Logo" />
        </div>

        <h3 className="text-dark fw-bold fs-4 mb-4 text-center">Login</h3>

        <form onSubmit={handleSubmit}>
          {/* LOGIN ID */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="loginId"
              placeholder="Login ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
            />
            <label htmlFor="loginId">Login ID</label>
          </div>

          {/* PASSWORD */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-end mb-3">
            <Link
              to="/forgot-password"
              className="text-primary fw-bold text-decoration-none"
            >
              Forgot Password?
            </Link>
          </div>

          {/* SIGN IN BUTTON */}
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign In
          </button>
        </form>

        <div className="text-center text-muted">
          Don't have an account?
          <Link
            to="/signup"
            className="text-primary fw-bold text-decoration-none"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;

