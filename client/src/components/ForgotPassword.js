import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your forgot password logic here
    console.log('Forgot Password:', { email });
    // Navigate to OTP page after sending OTP
    navigate('/otp');
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <section className="wrapper">
      <div className="container">
        <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
          <div className="logo">
            <img src="/images/mlogo.png" className="img-fluid" alt="logo" />
          </div>
          <form className="rounded bg-white shadow p-5" onSubmit={handleSubmit}>
            <h3 className="text-dark fw-bolder fs-4 mb-4">Forget Password</h3>

            <div className="fw-normal text-muted mb-4">
              Enter your email to reset your password
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="d-flex">
              <button
                type="submit"
                className="btn btn-primary submit_btn w-50 mx-2"
              >
                Send OTP
              </button>
              <button
                type="button"
                className="btn btn-secondary submit_btn w-50 mx-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

