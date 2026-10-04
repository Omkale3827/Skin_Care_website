import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import './Pages.css';
import './ProductDetails.css';

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('benefits');
  const [isAdded, setIsAdded] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="page-wrapper container">
      {/* Breadcrumbs */}
      <div className="luxe-breadcrumbs">
        <Link to="/">Maison</Link>
        <span>/</span>
        <Link to="/shop">Boutique</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`}>{product.categoryName}</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </div>

      <div className="product-details-layout">
        {/* Gallery */}
        <div className="product-details-gallery">
          <div className="product-details-main-img-wrap">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="product-details-main-img"
            />
            {product.isBestseller && (
              <span className="product-badge product-badge--bestseller product-details-badge">
                Iconic Atelier
              </span>
            )}
          </div>

          <div className="product-details-thumbs">
            <button
              className={`product-details-thumb ${selectedImage === product.image ? 'active' : ''}`}
              onClick={() => setSelectedImage(product.image)}
            >
              <img src={product.image} alt="Primary view" />
            </button>
            {product.hoverImage && (
              <button
                className={`product-details-thumb ${selectedImage === product.hoverImage ? 'active' : ''}`}
                onClick={() => setSelectedImage(product.hoverImage)}
              >
                <img src={product.hoverImage} alt="Alternate view" />
              </button>
            )}
          </div>
        </div>

        {/* Info Column */}
        <div className="product-details-info">
          <span className="product-details-category">
            <Sparkles size={13} /> {product.categoryName} • Haute Formulation
          </span>

          <h1 className="product-details-title">{product.name}</h1>
          <p className="product-details-tagline">{product.tagline}</p>

          {/* Rating */}
          <div className="product-details-rating">
            <div className="product-details-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? '#d4af37' : 'none'}
                  color="#d4af37"
                />
              ))}
            </div>
            <span className="product-details-score">{product.rating} / 5.0</span>
            <span className="product-details-rev-count">
              ({product.reviewsCount} verified connoisseur reviews)
            </span>
          </div>

          {/* Price */}
          <div className="product-details-price-row">
            <span className="product-details-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-details-orig-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="product-details-tax">Taxes included • Free courier</span>
          </div>

          {/* Short description */}
          <p className="product-details-desc">{product.description}</p>

          {/* Skin types badges */}
          <div className="product-details-skin-tags">
            <span className="product-details-skin-label">Suitable For:</span>
            {product.skinType?.map((st) => (
              <span key={st} className="product-details-skin-tag">
                {st}
              </span>
            ))}
          </div>

          {/* Quantity & CTA */}
          <div className="product-details-actions">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="quantity-btn"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="quantity-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              className="product-details-add-btn"
              icon={isAdded ? Check : ShoppingBag}
            >
              {isAdded ? 'Added To Your Bag' : `Add To Bag • $${(product.price * quantity).toFixed(2)}`}
            </Button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`product-details-wishlist-btn ${wishlisted ? 'active' : ''}`}
              title={wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
            >
              <Heart
                size={22}
                fill={wishlisted ? '#e0a899' : 'none'}
                color={wishlisted ? '#e0a899' : 'currentColor'}
              />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="product-details-perks">
            <div className="product-details-perk">
              <Truck size={18} />
              <span>Complimentary express delivery</span>
            </div>
            <div className="product-details-perk">
              <Sparkles size={18} />
              <span>3 bespoke samples included</span>
            </div>
            <div className="product-details-perk">
              <RotateCcw size={18} />
              <span>30-day graceful returns</span>
            </div>
          </div>

          {/* Tabbed Info */}
          <div className="product-details-tabs">
            <div className="product-tabs-header">
              <button
                className={`product-tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
                onClick={() => setActiveTab('benefits')}
              >
                Atelier Notes & Ritual
              </button>
              <button
                className={`product-tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
                onClick={() => setActiveTab('ingredients')}
              >
                Noble Ingredients
              </button>
            </div>
            <div className="product-tabs-content">
              {activeTab === 'benefits' && (
                <ul className="product-details-bullets">
                  {product.details?.map((detail, idx) => (
                    <li key={idx}>
                      <Sparkles size={14} className="gold-text" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'ingredients' && (
                <p className="product-details-ingredients">{product.ingredients}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="product-details-related">
          <div className="home-section__header">
            <div>
              <span className="section-tagline">Complementary Alchemy</span>
              <h2 className="section-title">Harmonious Pairings</h2>
            </div>
          </div>
          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
