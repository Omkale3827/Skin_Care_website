import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import './Navbar.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus & search on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isSearchOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target) &&
        !e.target.closest('.elane-action-btn--search')
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Filter products for quick search
  const filteredSearchProducts = searchQuery.trim()
    ? MOCK_PRODUCTS.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const toggleMobileSection = (section) => {
    setMobileExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    <header className={`elane-header ${isScrolled ? 'elane-header--scrolled' : ''}`}>
      {/* 1. Thin Dark Announcement Bar */}
      <div className="elane-announcement-bar">
        <span className="elane-announcement-text">
          COMPLIMENTARY SHIPPING ON ORDERS OVER $75
        </span>
      </div>

      {/* 2. Rounded Navigation Bar Wrapper */}
      <div className="elane-nav-wrapper">
        <nav className="elane-navbar" aria-label="Main Navigation">
          {/* Mobile Hamburger Toggle (Left on Mobile) */}
          <button
            type="button"
            className="elane-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
          </button>

          {/* Left: Brand Name */}
          <div className="elane-navbar__left">
            <Link to="/" className="elane-brand" aria-label="ÉLANE Home">
              <span className="elane-brand__text">ÉLANE</span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="elane-navbar__center">
            {/* SHOP with Dropdown */}
            <div
              className={`elane-nav-item ${activeDropdown === 'shop' ? 'elane-nav-item--active' : ''}`}
              onMouseEnter={() => setActiveDropdown('shop')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `elane-nav-link ${isActive && location.pathname === '/shop' && !location.search ? 'elane-nav-link--current' : ''}`
                }
              >
                <span>SHOP</span>
                <ChevronDown size={12} className="elane-chevron" strokeWidth={2} />
              </NavLink>

              {/* Shop Dropdown Menu */}
              <div className="elane-dropdown elane-dropdown--shop">
                <div className="elane-dropdown__inner">
                  <div className="elane-dropdown__col">
                    <span className="elane-dropdown__heading">Collections</span>
                    <Link to="/shop" className="elane-dropdown__link">
                      All Products
                    </Link>
                    <Link to="/shop?filter=bestseller" className="elane-dropdown__link">
                      Best Sellers
                    </Link>
                    <Link to="/shop?filter=new" className="elane-dropdown__link">
                      New Arrivals
                    </Link>
                    <Link to="/shop?category=beautysets" className="elane-dropdown__link">
                      Curated Sets & Coffrets
                    </Link>
                  </div>
                  <div className="elane-dropdown__col">
                    <span className="elane-dropdown__heading">Rituals & Science</span>
                    <Link to="/skin-test" className="elane-dropdown__link elane-dropdown__link--special">
                      <Sparkles size={13} /> AI Skin Diagnostics
                    </Link>
                    <Link to="/about" className="elane-dropdown__link">
                      Botanical Philosophy
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* SKINCARE with Dropdown */}
            <div
              className={`elane-nav-item ${activeDropdown === 'skincare' ? 'elane-nav-item--active' : ''}`}
              onMouseEnter={() => setActiveDropdown('skincare')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink
                to="/shop?category=skincare"
                className={({ isActive }) =>
                  `elane-nav-link ${location.search.includes('skincare') ? 'elane-nav-link--current' : ''}`
                }
              >
                <span>SKINCARE</span>
                <ChevronDown size={12} className="elane-chevron" strokeWidth={2} />
              </NavLink>

              {/* Skincare Dropdown Menu */}
              <div className="elane-dropdown">
                <div className="elane-dropdown__inner">
                  <div className="elane-dropdown__col">
                    <span className="elane-dropdown__heading">By Category</span>
                    <Link to="/shop?category=skincare" className="elane-dropdown__link">
                      Serums & Elixirs
                    </Link>
                    <Link to="/shop?category=face" className="elane-dropdown__link">
                      Moisturizers & Balms
                    </Link>
                    <Link to="/shop?category=eye" className="elane-dropdown__link">
                      Eye Care & Concentrates
                    </Link>
                    <Link to="/shop?category=bodycare" className="elane-dropdown__link">
                      Nourishing Body Oils
                    </Link>
                  </div>
                  <div className="elane-dropdown__col">
                    <span className="elane-dropdown__heading">Skin Focus</span>
                    <Link to="/shop?filter=glow" className="elane-dropdown__link">
                      Radiance & Glow
                    </Link>
                    <Link to="/shop?filter=anti-aging" className="elane-dropdown__link">
                      Youth Renewal & Plump
                    </Link>
                    <Link to="/shop?filter=hydration" className="elane-dropdown__link">
                      Deep Moisture Surge
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* MAKEUP with Dropdown */}
            <div
              className={`elane-nav-item ${activeDropdown === 'makeup' ? 'elane-nav-item--active' : ''}`}
              onMouseEnter={() => setActiveDropdown('makeup')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink
                to="/shop?category=makeup"
                className={({ isActive }) =>
                  `elane-nav-link ${location.search.includes('makeup') || location.search.includes('lip') ? 'elane-nav-link--current' : ''}`
                }
              >
                <span>MAKEUP</span>
                <ChevronDown size={12} className="elane-chevron" strokeWidth={2} />
              </NavLink>

              {/* Makeup Dropdown Menu */}
              <div className="elane-dropdown">
                <div className="elane-dropdown__inner">
                  <div className="elane-dropdown__col">
                    <span className="elane-dropdown__heading">Face & Lips</span>
                    <Link to="/shop?category=lip" className="elane-dropdown__link">
                      Velours Lip Colors & Tints
                    </Link>
                    <Link to="/shop?category=face" className="elane-dropdown__link">
                      Luminous Foundation & Blushes
                    </Link>
                    <Link to="/shop?category=eye" className="elane-dropdown__link">
                      Eye Enhancers & Mascaras
                    </Link>
                  </div>
                  <div className="elane-dropdown__col">
                    <span className="elane-dropdown__heading">Editions</span>
                    <Link to="/shop?filter=new" className="elane-dropdown__link">
                      Petal Soft Summer Collection
                    </Link>
                    <Link to="/shop?category=beautysets" className="elane-dropdown__link">
                      Couture Makeup Sets
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* BESTSELLERS */}
            <div className="elane-nav-item">
              <NavLink
                to="/shop?filter=bestseller"
                className={({ isActive }) =>
                  `elane-nav-link ${location.search.includes('bestseller') ? 'elane-nav-link--current' : ''}`
                }
              >
                <span>BESTSELLERS</span>
              </NavLink>
            </div>

            {/* NEW */}
            <div className="elane-nav-item">
              <NavLink
                to="/shop?filter=new"
                className={({ isActive }) =>
                  `elane-nav-link ${location.search.includes('new') ? 'elane-nav-link--current' : ''}`
                }
              >
                <span>NEW</span>
              </NavLink>
            </div>

            {/* ABOUT */}
            <div className="elane-nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `elane-nav-link ${isActive ? 'elane-nav-link--current' : ''}`
                }
              >
                <span>ABOUT</span>
              </NavLink>
            </div>
          </div>

          {/* Right: Search, Account, Wishlist, Shopping Bag */}
          <div className="elane-navbar__right">
            {/* Search Icon */}
            <button
              type="button"
              className={`elane-action-btn elane-action-btn--search ${isSearchOpen ? 'elane-action-btn--active' : ''}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              title="Search collection"
              aria-label="Search"
              aria-expanded={isSearchOpen}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Account Icon */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="elane-action-btn"
              title={isAuthenticated ? `Account (${user?.name})` : 'Account & Sign In'}
              aria-label="Account"
            >
              <User size={18} strokeWidth={1.5} />
              {isAuthenticated && <span className="elane-auth-dot" />}
            </Link>

            {/* Wishlist / Heart */}
            <Link
              to="/wishlist"
              className="elane-action-btn"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.5} />
              {totalWishlist > 0 && (
                <span className="elane-badge" aria-label={`${totalWishlist} items in wishlist`}>
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}
            <Link
              to="/cart"
              className="elane-action-btn"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="elane-badge" aria-label={`${totalItems} items in bag`}>
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>

      {/* Floating Interactive Quick Search Bar */}
      {isSearchOpen && (
        <div className="elane-search-overlay" ref={searchContainerRef}>
          <div className="elane-search-panel">
            <form onSubmit={handleSearchSubmit} className="elane-search-form">
              <Search size={18} strokeWidth={1.6} className="elane-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search elixirs, serums, shades & rituals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="elane-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="elane-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
              <button type="submit" className="elane-search-submit">
                Search <ArrowRight size={14} />
              </button>
            </form>

            {/* Quick Suggestions & Live Results */}
            <div className="elane-search-dropdown-content">
              {filteredSearchProducts.length > 0 ? (
                <div className="elane-search-results">
                  <span className="elane-search-label">Recommended Products</span>
                  <div className="elane-search-grid">
                    {filteredSearchProducts.map((prod) => (
                      <Link
                        key={prod.id}
                        to={`/product/${prod.id}`}
                        className="elane-search-item"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <img src={prod.image} alt={prod.name} className="elane-search-thumb" />
                        <div className="elane-search-details">
                          <span className="elane-search-prod-name">{prod.name}</span>
                          <span className="elane-search-prod-cat">{prod.categoryName}</span>
                          <span className="elane-search-prod-price">${prod.price.toFixed(2)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : searchQuery ? (
                <div className="elane-search-empty">
                  No exact match found. Press Enter to view all results in shop.
                </div>
              ) : (
                <div className="elane-search-suggestions">
                  <span className="elane-search-label">Popular Searches</span>
                  <div className="elane-search-tags">
                    <button
                      type="button"
                      className="elane-search-tag"
                      onClick={() => setSearchQuery('Serum')}
                    >
                      Celestial Serum
                    </button>
                    <button
                      type="button"
                      className="elane-search-tag"
                      onClick={() => setSearchQuery('Lip')}
                    >
                      Velours Lip Color
                    </button>
                    <button
                      type="button"
                      className="elane-search-tag"
                      onClick={() => setSearchQuery('Rose')}
                    >
                      Rose Hydrosol
                    </button>
                    <button
                      type="button"
                      className="elane-search-tag"
                      onClick={() => setSearchQuery('Cream')}
                    >
                      Night Recovery Cream
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Responsive Mobile Drawer Menu */}
      <div
        className={`elane-mobile-menu ${isMobileMenuOpen ? 'elane-mobile-menu--open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="elane-mobile-menu__backdrop" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="elane-mobile-menu__drawer">
          <div className="elane-mobile-menu__header">
            <Link to="/" className="elane-brand" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="elane-brand__text">ÉLANE</span>
            </Link>
            <button
              type="button"
              className="elane-mobile-menu__close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.6} />
            </button>
          </div>

          <div className="elane-mobile-menu__body">
            {/* SHOP Accordion */}
            <div className="elane-mobile-section">
              <button
                type="button"
                className="elane-mobile-link elane-mobile-link--accordion"
                onClick={() => toggleMobileSection('shop')}
              >
                <span>SHOP</span>
                <ChevronDown
                  size={16}
                  className={`elane-mobile-chevron ${mobileExpandedSection === 'shop' ? 'elane-mobile-chevron--rotated' : ''}`}
                />
              </button>
              {mobileExpandedSection === 'shop' && (
                <div className="elane-mobile-submenu">
                  <Link to="/shop" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    All Products
                  </Link>
                  <Link to="/shop?filter=bestseller" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    Best Sellers
                  </Link>
                  <Link to="/shop?filter=new" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    New Arrivals
                  </Link>
                  <Link to="/shop?category=beautysets" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    Gift Sets & Coffrets
                  </Link>
                </div>
              )}
            </div>

            {/* SKINCARE Accordion */}
            <div className="elane-mobile-section">
              <button
                type="button"
                className="elane-mobile-link elane-mobile-link--accordion"
                onClick={() => toggleMobileSection('skincare')}
              >
                <span>SKINCARE</span>
                <ChevronDown
                  size={16}
                  className={`elane-mobile-chevron ${mobileExpandedSection === 'skincare' ? 'elane-mobile-chevron--rotated' : ''}`}
                />
              </button>
              {mobileExpandedSection === 'skincare' && (
                <div className="elane-mobile-submenu">
                  <Link to="/shop?category=skincare" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    Serums & Concentrates
                  </Link>
                  <Link to="/shop?category=face" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    Face Creams & Balms
                  </Link>
                  <Link to="/shop?category=eye" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    Eye Treatments
                  </Link>
                  <Link to="/shop?category=bodycare" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    Body Care Rituals
                  </Link>
                </div>
              )}
            </div>

            {/* MAKEUP Accordion */}
            <div className="elane-mobile-section">
              <button
                type="button"
                className="elane-mobile-link elane-mobile-link--accordion"
                onClick={() => toggleMobileSection('makeup')}
              >
                <span>MAKEUP</span>
                <ChevronDown
                  size={16}
                  className={`elane-mobile-chevron ${mobileExpandedSection === 'makeup' ? 'elane-mobile-chevron--rotated' : ''}`}
                />
              </button>
              {mobileExpandedSection === 'makeup' && (
                <div className="elane-mobile-submenu">
                  <Link to="/shop?category=lip" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    Velours Lips & Gloss
                  </Link>
                  <Link to="/shop?category=face" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    Complexion & Blush
                  </Link>
                  <Link to="/shop?category=eye" className="elane-mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                    Eyes & Mascara
                  </Link>
                </div>
              )}
            </div>

            {/* BESTSELLERS */}
            <div className="elane-mobile-section">
              <Link
                to="/shop?filter=bestseller"
                className="elane-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BESTSELLERS
              </Link>
            </div>

            {/* NEW */}
            <div className="elane-mobile-section">
              <Link
                to="/shop?filter=new"
                className="elane-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NEW
              </Link>
            </div>

            {/* ABOUT */}
            <div className="elane-mobile-section">
              <Link
                to="/about"
                className="elane-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
            </div>

            <div className="elane-mobile-divider" />

            {/* Extra Luxury Features in Mobile */}
            <Link
              to="/skin-test"
              className="elane-mobile-link elane-mobile-link--highlight"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Sparkles size={16} />
              <span>AI Skin Diagnostics Ritual</span>
            </Link>

            <div className="elane-mobile-auth">
              {isAuthenticated ? (
                <Link
                  to="/account"
                  className="elane-mobile-auth-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={16} /> My Account ({user?.name})
                </Link>
              ) : (
                <div className="elane-mobile-auth-row">
                  <Link
                    to="/login"
                    className="elane-mobile-auth-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="elane-mobile-auth-btn elane-mobile-auth-btn--primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join Élane
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
