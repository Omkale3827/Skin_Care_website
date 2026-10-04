import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { CATEGORIES } from '../data/categories';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import './Pages.css';
import './Shop.css';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        currentCategory === 'all' || product.category === currentCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' retains natural curated order
    });
  }, [currentCategory, searchQuery, sortBy]);

  return (
    <div className="page-wrapper container">
      {/* Breadcrumbs */}
      <div className="luxe-breadcrumbs">
        <Link to="/">Maison Home</Link>
        <span>/</span>
        <span className="current">Atelier Boutique</span>
      </div>

      {/* Header */}
      <div className="page-hero">
        <span className="page-hero__tag">
          <Sparkles size={13} /> The Complete Collection
        </span>
        <h1 className="page-hero__title">
          Artisanal <span className="gold-text-gradient">Beauty Formulations</span>
        </h1>
        <p className="page-hero__desc">
          Browse our full repertory of luxury skincare, haute cosmetics, and sensory wellness creations.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="shop-categories-nav">
        <button
          className={`shop-category-pill ${currentCategory === 'all' ? 'shop-category-pill--active' : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          All Formulations ({MOCK_PRODUCTS.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`shop-category-pill ${currentCategory === cat.id ? 'shop-category-pill--active' : ''}`}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="shop-toolbar glass-panel">
        <div className="shop-search">
          <Search size={18} className="shop-search__icon" />
          <input
            type="text"
            placeholder="Search by ingredient, name, or concern..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shop-search__input"
          />
        </div>

        <div className="shop-toolbar__right">
          <span className="shop-count">
            Showing <strong>{filteredProducts.length}</strong> items
          </span>

          <div className="shop-sort">
            <SlidersHorizontal size={16} className="shop-sort__icon" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="shop-sort__select"
            >
              <option value="featured">Featured Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Sparkles size={40} className="empty-state__icon" />
          <h2 className="empty-state__title">No Formulations Found</h2>
          <p className="empty-state__desc">
            We couldn't find any creations matching your search criteria. Try selecting another category or resetting filters.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              handleCategoryChange('all');
            }}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Shop;
