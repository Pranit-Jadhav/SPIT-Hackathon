import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
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
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Add your change password logic here
    console.log('Change Password:', formData);
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
            <h3 className="text-dark fw-bolder fs-4 mb-4">Change Password</h3>

            <div className="fw-normal text-muted mb-4">Enter new password</div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="newPassword">New Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>

            <div className="d-flex justify-content-center mt-3 mb-4">
              <button type="submit" className="btn btn-primary submit_btn">
                Change the Password
              </button>
            </div>

            <div className="text-center fw-normal text-muted small">
              Didn't get the code?
              <Link
                to="/signup"
                className="text-primary fw-bold text-decoration-none"
              >
                Reset
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;

