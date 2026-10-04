import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import './Pages.css';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all requested credentials.');
      return;
    }
    signup(name, email, password);
    navigate('/account');
  };

  return (
    <div className="page-wrapper container">
      {/* Breadcrumbs */}
      <div className="luxe-breadcrumbs">
        <Link to="/">Maison</Link>
        <span>/</span>
        <span className="current">Create Client Profile</span>
      </div>

      <div className="luxe-auth-card">
        <div className="luxe-auth-header">
          <span className="section-tagline">
            <Gift size={12} /> Privilège Membership
          </span>
          <h1 className="luxe-auth-title">Join The Maison</h1>
          <p className="luxe-auth-sub">
            Indulge in 100 welcome tier points, personal skin diagnostics, and private salon releases.
          </p>
        </div>

        {error && (
          <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="luxe-form-group">
            <label className="luxe-label" htmlFor="signup-name">
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Clara Dupont"
              required
              className="luxe-input"
            />
          </div>

          <div className="luxe-form-group">
            <label className="luxe-label" htmlFor="signup-email">
              Email Address
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. clara.dupont@lumiere.paris"
              required
              className="luxe-input"
            />
          </div>

          <div className="luxe-form-group">
            <label className="luxe-label" htmlFor="signup-password">
              Create Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              className="luxe-input"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <input
              type="checkbox"
              id="signup-agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              style={{ accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
            />
            <label htmlFor="signup-agree" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Subscribe to the Privilège Circle for private atelier previews.
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={ArrowRight}
            iconPosition="right"
          >
            Create My Privilège Profile
          </Button>
        </form>

        <div className="luxe-auth-footer">
          <span>Already registered with us?</span>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
