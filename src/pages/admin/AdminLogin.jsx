import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/db';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setForgotPasswordMsg('');

    if (!email || !password) {
      setError('Please fill in all credentials.');
      return;
    }

    const res = db.login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message || 'Incorrect email or password.');
    }
  };

  const handleForgotPassword = () => {
    // Reveal credential hint or support reset simulator
    setShowForgotModal(true);
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo-container">
          <img src="/images/logo.png" alt="Himani Construction Logo" className="login-logo" />
        </div>
        
        <h2>Admin Portal Login</h2>
        <p className="login-subtitle">Enter credentials to manage projects and blogs</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="admin@himaniconstruction.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-actions">
            <button type="button" onClick={handleForgotPassword} className="forgot-pwd-btn">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-submit-btn">
            Secure Sign In
          </button>
        </form>
      </div>

      {showForgotModal && (
        <div className="forgot-modal-overlay">
          <div className="forgot-modal">
            <h3>Password Recovery</h3>
            <p className="forgot-instructions">
              To maintain system integrity, passwords can only be recovered through approved admin security paths. 
            </p>
            <div className="hint-box">
              <strong>Authorized Administrator Email:</strong><br />
              <code>himaniconstructionsandinterior@gmail.com</code><br /><br />
              <strong>Password Reset Hint:</strong><br />
              <em>Use your default configured credential: <strong>Himani@2026</strong></em>
            </div>
            <button 
              onClick={() => setShowForgotModal(false)}
              className="close-modal-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
