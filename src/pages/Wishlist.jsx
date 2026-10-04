import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import './Pages.css';

export const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((product) => {
      addToCart(product, 1);
    });
  };

  return (
    <div className="page-wrapper container">
      {/* Breadcrumbs */}
      <div className="luxe-breadcrumbs">
        <Link to="/">Maison</Link>
        <span>/</span>
        <span className="current">Private Wishlist</span>
      </div>

      <div className="page-hero">
        <span className="page-hero__tag">
          <Heart size={13} /> Your Curated Desires
        </span>
        <h1 className="page-hero__title">
          The Private <span className="gold-text-gradient">Wishlist</span>
        </h1>
        <p className="page-hero__desc">
          Your saved haute cosmetics and coveted skincare formulations, reserved for your next personal ceremony.
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <div>
          <div className="shop-toolbar glass-panel">
            <span className="shop-count">
              <strong>{wishlistItems.length}</strong> items saved
            </span>
            <div className="shop-toolbar__right">
              <Button
                variant="primary"
                size="sm"
                icon={ShoppingBag}
                onClick={handleMoveAllToCart}
              >
                Move All To Bag
              </Button>
            </div>
          </div>

          <div className="products-grid">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={44} className="empty-state__icon" />
          <h2 className="empty-state__title">Your Wishlist Is Empty</h2>
          <p className="empty-state__desc">
            Explore our collections and tap the heart icon on any formulation to curate your private selection.
          </p>
          <Button to="/shop" variant="primary" icon={Sparkles}>
            Explore Atelier Boutique
          </Button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
