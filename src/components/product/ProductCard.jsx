import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        {/* Media / Image Container */}
        <div className="product-card__media">
          <img
            src={product.image}
            alt={product.name}
            className="product-card__img product-card__img--primary"
            loading="lazy"
          />
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              className="product-card__img product-card__img--hover"
              loading="lazy"
            />
          )}

          {/* Badges */}
          <div className="product-card__badges">
            {product.isNew && (
              <span className="product-badge product-badge--new">New</span>
            )}
            {product.isBestseller && (
              <span className="product-badge product-badge--bestseller">Iconic</span>
            )}
            {product.originalPrice && (
              <span className="product-badge product-badge--sale">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            className={`product-card__wishlist-btn ${wishlisted ? 'product-card__wishlist-btn--active' : ''}`}
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            title={wishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
          >
            <Heart
              size={18}
              fill={wishlisted ? '#e0a899' : 'none'}
              color={wishlisted ? '#e0a899' : 'currentColor'}
            />
          </button>

          {/* Quick Add Overlay */}
          <button
            type="button"
            className={`product-card__quick-add ${isAdded ? 'product-card__quick-add--added' : ''}`}
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <>
                <Check size={16} /> Added To Bag
              </>
            ) : (
              <>
                <ShoppingBag size={16} /> Quick Add • ${product.price.toFixed(2)}
              </>
            )}
          </button>
        </div>

        {/* Product Details */}
        <div className="product-card__content">
          <div className="product-card__meta">
            <span className="product-card__category">{product.categoryName}</span>
            <div className="product-card__rating">
              <Star size={12} fill="#d4af37" color="#d4af37" />
              <span>{product.rating}</span>
              <span className="product-card__reviews">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__tagline">{product.tagline}</p>

          <div className="product-card__price-row">
            <span className="product-card__price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-card__original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
