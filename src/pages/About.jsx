import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Leaf, Droplet, Heart, Award } from 'lucide-react';
import Button from '../components/common/Button';
import './Pages.css';
import './About.css';

export const About = () => {
  return (
    <div className="about-page">
      <div className="container page-wrapper">
        {/* Breadcrumbs */}
        <div className="luxe-breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="current">Our Story</span>
        </div>

        <div className="page-hero">
          <span className="page-hero__tag">
            <Sparkles size={13} /> BEAUTY WITH INTENTION
          </span>
          <h1 className="page-hero__title">
            Softness, reimagined.
          </h1>
          <p className="page-hero__desc">
            We believe makeup and skincare should feel like you—never a mask. Our thoughtful
            formulas blend restorative botanical care with expressive color, made to move through
            every version of your day.
          </p>
        </div>

        {/* Story Narrative Grid */}
        <div className="about-story-grid">
          <div className="about-story-img-wrap">
            <img
              src="/story_smiling_model.jpg"
              alt="Radiant model holding Élane botanical elixir"
              className="about-story-img"
            />
          </div>
          <div className="about-story-text">
            <span className="section-tagline">CHAPTER I • THE PHILOSOPHY</span>
            <h2 className="about-story-title">You, only more luminous.</h2>
            <p>
              Founded with a quiet reverence for the beauty of petals, Élane was born to strip away
              the heavy layers of conventional cosmetics in favor of airy, breathable formulas that celebrate
              individual skin texture.
            </p>
            <p>
              Each formulation is crafted with cold-pressed organic botanicals, damascena rose water,
              and biomimetic squalane. The result is skin that feels replenished, calm, and naturally radiant
              from morning until evening.
            </p>
            <div className="about-signature">
              <span className="about-signature-text">Élane Atelier</span>
              <span className="about-signature-title">Parisian Botanical Laboratory</span>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <section className="about-pillars">
          <div style={{ textAlign: 'center', margin: '0 auto 48px', maxWidth: '680px' }}>
            <span className="section-tagline">OUR UNWAVERING PROMISE</span>
            <h2 className="section-title">Formulated for Radiance</h2>
          </div>

          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <Leaf className="about-pillar-icon" size={26} strokeWidth={1.5} />
              <h3 className="about-pillar-title">Botanical Biocompatibility</h3>
              <p className="about-pillar-desc">
                We select plant-based lipids, floral hydrosols, and skin-identical ceramides that melt
                effortlessly into the epidermal barrier.
              </p>
            </div>
            <div className="about-pillar-card">
              <Droplet className="about-pillar-icon" size={26} strokeWidth={1.5} />
              <h3 className="about-pillar-title">Weightless Dewy Glow</h3>
              <p className="about-pillar-desc">
                Micro-milled mineral pigments deliver buildable, luminous coverage that breathes
                freely with your skin throughout the day.
              </p>
            </div>
            <div className="about-pillar-card">
              <Heart className="about-pillar-icon" size={26} strokeWidth={1.5} />
              <h3 className="about-pillar-title">Conscious Integrity</h3>
              <p className="about-pillar-desc">
                100% cruelty-free, vegan, and housed in refillable glass flacons designed to grace
                your vanity as enduring art objects.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="about-cta-banner">
          <div className="about-cta-content">
            <span className="section-tagline">DISCOVER YOUR MATCH</span>
            <h3 className="about-cta-title">Find Your Bespoke Botanical Ritual</h3>
            <p className="about-cta-desc">
              Take our interactive 2-minute diagnostic to reveal the ideal shades, serums, and textures
              tailored to your unique complexion.
            </p>
            <Button to="/skin-test" size="lg" variant="primary" icon={Sparkles}>
              Start Skin Diagnostic
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
