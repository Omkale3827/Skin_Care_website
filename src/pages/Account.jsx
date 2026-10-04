import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Sparkles,
  Heart,
  LogOut,
  MapPin,
  CreditCard,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/common/Button';
import './Pages.css';
import './Account.css';

const MOCK_ORDERS = [
  {
    id: 'LM-94821',
    date: 'September 28, 2026',
    status: 'Delivered',
    total: 130.00,
    items: ['Celestial Radiance Serum', 'Velours De Soie Matte Lipstick'],
    courier: 'DHL Express Haute Tracking #928174'
  },
  {
    id: 'LM-87241',
    date: 'August 14, 2026',
    status: 'Delivered',
    total: 185.00,
    items: ['The Royal Sovereign Vanity Set'],
    courier: 'FedEx Luxury Signature #481920'
  }
];

export const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="page-wrapper container">
        <div className="empty-state glass-panel">
          <User size={48} className="empty-state__icon" />
          <h2 className="empty-state__title">Client Authentication Required</h2>
          <p className="empty-state__desc">
            Please sign in to your Privilège account to review your orders, loyalty tier, and tailored skin rituals.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Button to="/login" variant="primary">
              Sign In To Account
            </Button>
            <Button to="/signup" variant="secondary">
              Create New Membership
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page-wrapper container">
      {/* Breadcrumbs */}
      <div className="luxe-breadcrumbs">
        <Link to="/">Maison</Link>
        <span>/</span>
        <span className="current">Client Dashboard</span>
      </div>

      <div className="account-layout">
        {/* Profile Card Sidebar */}
        <aside className="account-sidebar glass-panel">
          <div className="account-avatar-wrap">
            <div className="account-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="account-user-meta">
              <h2 className="account-user-name">{user.name}</h2>
              <span className="account-user-email">{user.email}</span>
            </div>
          </div>

          <div className="account-tier-badge">
            <Sparkles size={14} />
            <span>{user.tier || 'Gold VIP Member'}</span>
          </div>

          <div className="account-stats-row">
            <div className="account-stat">
              <span className="account-stat-val">{user.points || 450}</span>
              <span className="account-stat-lbl">Privilège Pts</span>
            </div>
            <div className="account-stat-divider" />
            <div className="account-stat">
              <span className="account-stat-val">{totalWishlist}</span>
              <span className="account-stat-lbl">Wishlisted</span>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="account-nav">
            <button
              className={`account-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={18} />
              <span>Atelier Orders</span>
            </button>
            <button
              className={`account-nav-btn ${activeTab === 'diagnostics' ? 'active' : ''}`}
              onClick={() => setActiveTab('diagnostics')}
            >
              <Sparkles size={18} />
              <span>Dermal Diagnostic</span>
            </button>
            <button
              className={`account-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin size={18} />
              <span>Delivery Addresses</span>
            </button>
            <Link to="/wishlist" className="account-nav-btn">
              <Heart size={18} />
              <span>My Wishlist ({totalWishlist})</span>
            </Link>
          </nav>

          <div className="account-sidebar-footer">
            <button onClick={handleLogout} className="account-logout-btn">
              <LogOut size={16} />
              <span>Sign Out Of Salon</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="account-content">
          {activeTab === 'orders' && (
            <div className="glass-panel account-panel">
              <h3 className="account-panel-title">Atelier Order History</h3>
              <p className="account-panel-sub">
                Track your parcels and review your archival purchases.
              </p>

              <div className="account-orders-list">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="account-order-card">
                    <div className="account-order-header">
                      <div>
                        <span className="account-order-id">Order {order.id}</span>
                        <span className="account-order-date">{order.date}</span>
                      </div>
                      <span className="account-order-status">
                        <CheckCircle2 size={14} /> {order.status}
                      </span>
                    </div>

                    <div className="account-order-items">
                      {order.items.map((item, idx) => (
                        <span key={idx} className="account-order-pill">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="account-order-footer">
                      <span className="account-order-courier">{order.courier}</span>
                      <span className="account-order-total">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div className="glass-panel account-panel">
              <h3 className="account-panel-title">Skin Diagnostic Profile</h3>
              <p className="account-panel-sub">
                Your stored biophysiological skin parameters and custom ritual ceremony.
              </p>

              <div className="account-diagnostic-card">
                <div className="account-diagnostic-badge">
                  <Sparkles size={14} /> Active Protocol
                </div>
                <h4 className="account-diagnostic-title">
                  Celestial Glass Glow & Barrier Reinforcement
                </h4>
                <p className="account-diagnostic-details">
                  Skin Profile: Combination, Dehydration-Prone • Goal: Plumping Luminosity • Formula Texture: Nectar & Velvet Soufflé.
                </p>
                <Button to="/skin-test" variant="outline" size="sm" icon={Clock}>
                  Update Skin Diagnostic
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="glass-panel account-panel">
              <h3 className="account-panel-title">Preferred Delivery Addresses</h3>
              <p className="account-panel-sub">
                Manage your residential courier and gifting destinations.
              </p>

              <div className="account-address-card">
                <span className="account-address-default">Primary Residence</span>
                <h4 className="account-address-name">{user.name}</h4>
                <p className="account-address-lines">
                  75 Avenue Montaigne, 75008 Paris, France<br />
                  Private Courier Instructions: Ring concierge buzzer 4B
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Account;
