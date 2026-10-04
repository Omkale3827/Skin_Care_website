import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="elane-footer">
      {/* Guarantees bar */}
      <div className="elane-perks">
        <div className="container elane-perks__grid">
          <div className="elane-perk-item">
            <Truck className="elane-perk-icon" size={20} strokeWidth={1.5} />
            <div>
              <h4 className="elane-perk-title">Complimentary Shipping</h4>
              <p className="elane-perk-desc">On all qualifying orders over $75</p>
            </div>
          </div>
          <div className="elane-perk-item">
            <Sparkles className="elane-perk-icon" size={20} strokeWidth={1.5} />
            <div>
              <h4 className="elane-perk-title">Petal Collection Samples</h4>
              <p className="elane-perk-desc">Deluxe trial miniatures with every order</p>
            </div>
          </div>
          <div className="elane-perk-item">
            <ShieldCheck className="elane-perk-icon" size={20} strokeWidth={1.5} />
            <div>
              <h4 className="elane-perk-title">Clean Botanical Care</h4>
              <p className="elane-perk-desc">100% cruelty-free, vegan & gentle formulas</p>
            </div>
          </div>
          <div className="elane-perk-item">
            <RefreshCw className="elane-perk-icon" size={20} strokeWidth={1.5} />
            <div>
              <h4 className="elane-perk-title">Serene Returns</h4>
              <p className="elane-perk-desc">30-day effortless satisfaction promise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="elane-footer__main">
        <div className="container elane-footer__grid">
          {/* Brand & Newsletter */}
          <div className="elane-footer__brand-col">
            <Link to="/" className="elane-footer__logo">ÉLANE</Link>
            <p className="elane-footer__tagline">
              Softness, reimagined. Skin-loving color and restorative botanicals inspired by the quiet beauty of petals.
            </p>

            <form onSubmit={handleSubscribe} className="elane-newsletter-form">
              <span className="elane-newsletter-label">JOIN OUR CIRCLE</span>
              <div className="elane-newsletter-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="elane-newsletter-input"
                />
                <button type="submit" className="elane-newsletter-btn" aria-label="Subscribe">
                  {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
                </button>
              </div>
              {subscribed && (
                <span className="elane-newsletter-success">
                  Welcome to Élane. Enjoy 15% off your inaugural ritual.
                </span>
              )}
            </form>
          </div>

          {/* Links Column: Shop */}
          <div className="elane-footer__col">
            <h5 className="elane-footer__heading">Shop</h5>
            <ul className="elane-footer__links">
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?category=skincare">Skincare</Link></li>
              <li><Link to="/shop?category=makeup">Makeup</Link></li>
              <li><Link to="/shop?category=lip">Lips</Link></li>
              <li><Link to="/shop?category=face">Face</Link></li>
              <li><Link to="/shop?category=eye">Eyes</Link></li>
              <li><Link to="/shop?category=beautysets">Sets & Gifts</Link></li>
            </ul>
          </div>

          {/* Links Column: Rituals */}
          <div className="elane-footer__col">
            <h5 className="elane-footer__heading">Rituals</h5>
            <ul className="elane-footer__links">
              <li><Link to="/skin-test">AI Skin Diagnostics</Link></li>
              <li><Link to="/shop?filter=bestseller">Bestsellers</Link></li>
              <li><Link to="/shop?filter=new">New Arrivals</Link></li>
              <li><Link to="/wishlist">Saved Wishlist</Link></li>
              <li><Link to="/cart">Shopping Bag</Link></li>
            </ul>
          </div>

          {/* Links Column: About */}
          <div className="elane-footer__col">
            <h5 className="elane-footer__heading">Élane</h5>
            <ul className="elane-footer__links">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/about#botanicals">Botanical Philosophy</Link></li>
              <li><Link to="/account">My Account</Link></li>
              <li><a href="#shipping">Shipping & Returns</a></li>
              <li><a href="#privacy">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="elane-footer__bottom">
        <div className="container elane-footer__bottom-inner">
          <p className="elane-footer__copy">
            © {new Date().getFullYear()} ÉLANE PARFUMERIE & BEAUTÉ. All rights reserved.
          </p>
          <div className="elane-footer__legal">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
