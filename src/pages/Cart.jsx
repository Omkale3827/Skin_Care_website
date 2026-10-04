import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import './Pages.css';
import './Cart.css';

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } =
    useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const shippingCost = subtotal > 75 || subtotal === 0 ? 0 : 12;
  const discountAmount = (subtotal * promoDiscount);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LUMIERE15') {
      setPromoDiscount(0.15);
      setPromoMessage('✨ 15% Privilège discount applied!');
    } else {
      setPromoDiscount(0);
      setPromoMessage('Invalid promo code. Try "LUMIERE15"');
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    clearCart();
  };

  if (checkoutComplete) {
    return (
      <div className="page-wrapper container">
        <div className="empty-state glass-panel">
          <Sparkles size={48} className="empty-state__icon gold-text" />
          <h2 className="empty-state__title">Merci Pour Votre Commande</h2>
          <p className="empty-state__desc">
            Your haute beauty order has been gracefully received. A confirmation ceremony email and tracking number are on their way.
          </p>
          <Button to="/shop" variant="primary">
            Continue Exploring
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper container">
      {/* Breadcrumbs */}
      <div className="luxe-breadcrumbs">
        <Link to="/">Maison</Link>
        <span>/</span>
        <span className="current">Shopping Bag</span>
      </div>

      <div className="page-hero">
        <span className="page-hero__tag">
          <ShoppingBag size={13} /> Your Atelier Selection
        </span>
        <h1 className="page-hero__title">
          Shopping <span className="gold-text-gradient">Bag</span>
        </h1>
        <p className="page-hero__desc">
          Review your chosen elixirs and formulas before entering our secure checkout lounge.
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="cart-layout">
          {/* Items List */}
          <div className="cart-items-col">
            <div className="cart-items-header">
              <span>{totalItems} Formulations Selected</span>
              <button onClick={clearCart} className="cart-clear-btn">
                Clear All
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row glass-panel">
                  <Link to={`/product/${item.id}`} className="cart-item-img-link">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </Link>

                  <div className="cart-item-info">
                    <span className="cart-item-category">{item.categoryName}</span>
                    <Link to={`/product/${item.id}`} className="cart-item-name">
                      {item.name}
                    </Link>
                    <span className="cart-item-unit-price">${item.price.toFixed(2)} each</span>
                  </div>

                  {/* Quantity */}
                  <div className="cart-item-qty">
                    <div className="quantity-selector quantity-selector--sm">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cart-item-remove"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-free-shipping-notice">
              {subtotal >= 75 ? (
                <span>✨ You have qualified for <strong>Complimentary Global Courier</strong>!</span>
              ) : (
                <span>
                  Add <strong>${(75 - subtotal).toFixed(2)}</strong> more to unlock Complimentary White-Glove Shipping.
                </span>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="cart-summary-col">
            <div className="cart-summary-card glass-panel">
              <h3 className="cart-summary-title">Summary & Ritual</h3>

              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="cart-summary-row cart-summary-row--discount">
                    <span>Privilège Discount (15%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="cart-summary-row">
                  <span>Courier Delivery</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="cart-summary-row">
                  <span>3 Atelier Samples</span>
                  <span className="gold-text">Complimentary</span>
                </div>
              </div>

              {/* Promo Form */}
              <form onSubmit={applyPromo} className="cart-promo-form">
                <div className="cart-promo-input-wrap">
                  <Tag size={16} className="cart-promo-icon" />
                  <input
                    type="text"
                    placeholder="Enter code (try LUMIERE15)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="cart-promo-input"
                  />
                  <button type="submit" className="cart-promo-apply">
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <span className="cart-promo-msg">{promoMessage}</span>
                )}
              </form>

              <div className="cart-summary-divider" />

              <div className="cart-summary-total-row">
                <span>Estimated Total</span>
                <span className="cart-summary-grand">${grandTotal.toFixed(2)}</span>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </Button>

              <div className="cart-security-badge">
                <ShieldCheck size={16} />
                <span>256-Bit Encrypted Haute Security Checkout</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <ShoppingBag size={44} className="empty-state__icon" />
          <h2 className="empty-state__title">Your Bag Is Quietly Waiting</h2>
          <p className="empty-state__desc">
            Your shopping bag is currently vacant. Discover our acclaimed formulas and elixirs to commence your order.
          </p>
          <Button to="/shop" variant="primary" icon={Sparkles}>
            Explore Atelier Boutique
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
