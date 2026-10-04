import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import './Pages.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password');
      return;
    }
    login(email, password);
    navigate('/account');
  };

  const handleQuickFill = () => {
    setEmail('clara.dupont@lumiere.paris');
    setPassword('haute1234');
  };

  return (
    <div className="page-wrapper container">
      {/* Breadcrumbs */}
      <div className="luxe-breadcrumbs">
        <Link to="/">Maison</Link>
        <span>/</span>
        <span className="current">Client Portal Login</span>
      </div>

      <div className="luxe-auth-card">
        <div className="luxe-auth-header">
          <span className="section-tagline">
            <Sparkles size={12} /> Privilège Member Lounge
          </span>
          <h1 className="luxe-auth-title">Welcome Back</h1>
          <p className="luxe-auth-sub">
            Sign in to access your curated orders, VIP points, and personalized skin diagnostics.
          </p>
        </div>

        {error && (
          <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="luxe-form-group">
            <label className="luxe-label" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@domain.com"
              required
              className="luxe-input"
            />
          </div>

          <div className="luxe-form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="luxe-label" htmlFor="login-password">
                Password
              </label>
              <a href="#forgot" style={{ fontSize: '0.75rem', color: 'var(--gold-primary)' }}>
                Forgot Password?
              </a>
            </div>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="luxe-input"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={ArrowRight}
            iconPosition="right"
          >
            Sign In To Salon
          </Button>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              onClick={handleQuickFill}
              style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
            >
              Fill Quick Demo VIP Credentials
            </button>
          </div>
        </form>

        <div className="luxe-auth-footer">
          <span>New to Lumière Beauté?</span>
          <Link to="/signup">Register Membership</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
