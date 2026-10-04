import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, Award, Compass, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import ProductCard from '../components/product/ProductCard';
import CategoryCard from '../components/product/CategoryCard';
import Button from '../components/common/Button';
import './Home.css';

export const Home = () => {
  // 6 Main Categories from Reference Image 2
  const topCategories = CATEGORIES.slice(0, 6);

  // Bestsellers from Mock Products
  const bestsellers = MOCK_PRODUCTS.filter(p => p.isBestseller).slice(0, 4);

  return (
    <div className="home-page">
      {/* =========================================================================
          1. HERO SECTION (Reference Screenshot 1)
          Full-width hero banner featuring glowing model close-up with luminous skin,
          "Softness, reimagined.", supporting description, and dual CTA buttons.
          ========================================================================= */}
      <section className="home-hero" aria-label="Hero Spotlight">
        <div className="home-hero__bg">
          <img
            src="/hero_petal_model.jpg"
            alt="Luminous model highlighting natural glowing skin"
            className="home-hero__img"
          />
          <div className="home-hero__gradient-overlay" />
        </div>

        <div className="container home-hero__container">
          <div className="home-hero__copy">
            <span className="home-hero__tagline">THE PETAL COLLECTION</span>
            <h1 className="home-hero__title">
              Softness,<br />
              reimagined.
            </h1>
            <p className="home-hero__desc">
              Skin–loving color inspired by the quiet beauty of petals.<br />
              Effortless, expressive, entirely you.
            </p>
            <div className="home-hero__cta-group">
              <Button to="/shop" size="md" variant="white">
                SHOP NOW
              </Button>
              <Button to="/shop?filter=new" size="md" variant="underline">
                EXPLORE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CATEGORY GRID SECTION (Reference Screenshot 2)
          "Shop by category" in classic serif, 6-column category cards row
          (Makeup, Skincare, Lips, Face, Eyes, Sets) with arrow indicators.
          ========================================================================= */}
      <section className="home-categories-section">
        <div className="container">
          <div className="home-categories__header">
            <h2 className="home-categories__title">Shop by category</h2>
          </div>

          <div className="home-categories__grid">
            {topCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BESTSELLERS SECTION (Bottom of Reference Screenshot 2)
          "THE ONES YOU LOVE" subtag, "Bestsellers" classic serif heading,
          and curated 4-product grid.
          ========================================================================= */}
      <section className="home-bestsellers-section">
        <div className="container">
          <div className="home-bestsellers__header">
            <span className="section-tagline">THE ONES YOU LOVE</span>
            <h2 className="section-title">Bestsellers</h2>
          </div>

          <div className="home-bestsellers__grid">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="home-bestsellers__footer-cta">
            <Button to="/shop?filter=bestseller" variant="outline" icon={ArrowRight} iconPosition="right">
              View All Bestsellers
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FEATURE / STORY SPOTLIGHT (Reference Screenshot 3)
          Two-column split layout: Left smiling model holding serum dropper bottle;
          Right soft blush-beige background with sub-header "BEAUTY WITH INTENTION",
          heading "You, only more luminous.", body text, and dark button "DISCOVER OUR STORY →"
          ========================================================================= */}
      <section className="home-story-section">
        <div className="home-story-split">
          {/* Left Column: Model holding skincare serum */}
          <div className="home-story-split__media">
            <img
              src="/story_smiling_model.jpg"
              alt="Smiling model holding luminous skincare elixir"
              className="home-story-split__img"
              loading="lazy"
            />
            {/* Subtle Star Sparkle Graphic Accent */}
            <div className="home-story-split__sparkle" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            </div>
          </div>

          {/* Right Column: Soft Blush-Beige Story Card */}
          <div className="home-story-split__content">
            <div className="home-story-split__inner">
              <span className="home-story-split__sub">BEAUTY WITH INTENTION</span>
              <h2 className="home-story-split__title">
                You, only<br />
                more luminous.
              </h2>
              <p className="home-story-split__body">
                We believe makeup should feel like you—never a mask. Our thoughtful formulas
                blend botanical care with expressive color, made to move through every
                version of your day.
              </p>
              <div className="home-story-split__action">
                <Button to="/about" size="lg" variant="primary" icon={ArrowRight} iconPosition="right">
                  DISCOVER OUR STORY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. AI SKIN DIAGNOSTIC RITUAL TEASER (Warm Nude Card)
          ========================================================================= */}
      <section className="home-diagnostic-section">
        <div className="container">
          <div className="home-diagnostic-card">
            <div className="home-diagnostic-card__copy">
              <span className="section-tagline">
                <Sparkles size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Personalized Skin Analysis
              </span>
              <h3 className="home-diagnostic-card__title">
                Find Your Perfect Skin Ritual in 2 Minutes
              </h3>
              <p className="home-diagnostic-card__desc">
                Answer five simple questions about your skin texture, environment, and radiance goals
                to receive a bespoke botanical regimen created specifically for you.
              </p>
              <div className="home-diagnostic-card__cta">
                <Button to="/skin-test" variant="primary" icon={Sparkles}>
                  Take The Diagnostic Test
                </Button>
              </div>
            </div>
            <div className="home-diagnostic-card__media">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
                alt="Botanical skin consultation"
                className="home-diagnostic-card__img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. BRAND PILLARS / ETHOS (Clean warm minimalism)
          ========================================================================= */}
      <section className="home-pillars-section">
        <div className="container">
          <div className="home-pillars__grid">
            <div className="home-pillar-item">
              <span className="home-pillar-item__tag">BOTANICAL SCIENCE</span>
              <h4 className="home-pillar-item__title">Skin-Kind Formulations</h4>
              <p className="home-pillar-item__desc">
                Infused with damascus rose hydrosol, hyaluronic micro-spheres, and squalane for true nourishment.
              </p>
            </div>
            <div className="home-pillar-item">
              <span className="home-pillar-item__tag">FEATHERWEIGHT WEAR</span>
              <h4 className="home-pillar-item__title">Weightless Coverage</h4>
              <p className="home-pillar-item__desc">
                Airy, breathable pigments that enhance your natural beauty rather than concealing your true glow.
              </p>
            </div>
            <div className="home-pillar-item">
              <span className="home-pillar-item__tag">CONSCIOUS LUXURY</span>
              <h4 className="home-pillar-item__title">Cruelty-Free & Clean</h4>
              <p className="home-pillar-item__desc">
                Certified clean, 100% vegan, and crafted under the highest European cosmetic standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
