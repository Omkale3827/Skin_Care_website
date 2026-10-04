import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/common/Button';
import './Pages.css';
import './SkinTest.css';

const QUESTIONS = [
  {
    id: 1,
    title: 'How does your skin feel midday?',
    options: [
      { label: 'Tight, dry or flaky in areas', type: 'Dry' },
      { label: 'Oily or shiny all over', type: 'Oily' },
      { label: 'Oily in T-zone (forehead, nose), normal elsewhere', type: 'Combination' },
      { label: 'Balanced, comfortable, neither too oily nor dry', type: 'Normal' },
      { label: 'Easily reactive, prone to redness or stinging', type: 'Sensitive' }
    ]
  },
  {
    id: 2,
    title: 'What is your primary radiance aspiration?',
    options: [
      { label: 'Ethereal Glass Glow & Deep Plumping', goal: 'Glow' },
      { label: 'Firming Contours & Cellular Youth Renewal', goal: 'Anti-Aging' },
      { label: 'Barrier Repair & Soothing Intense Moisture', goal: 'Hydration' },
      { label: 'Flawless Complexion & Diffused Texture', goal: 'Poreless' }
    ]
  },
  {
    id: 3,
    title: 'Which sensory texture enchants you most?',
    options: [
      { label: 'Weightless water-nectar and botanical serums', texture: 'Serum' },
      { label: 'Rich whipped soufflé creams and balms', texture: 'Cream' },
      { label: 'Precious dry oils with golden glow', texture: 'Oil' }
    ]
  }
];

export const SkinTest = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { addToCart } = useCart();
  const [addedAll, setAddedAll] = useState(false);

  const handleSelectOption = (key, value) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setIsCompleted(false);
    setAddedAll(false);
  };

  // Matched recommendations
  const recommendedProducts = MOCK_PRODUCTS.slice(0, 3);

  const handleAddAll = () => {
    recommendedProducts.forEach((p) => addToCart(p, 1));
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2500);
  };

  return (
    <div className="page-wrapper container">
      {/* Breadcrumbs */}
      <div className="luxe-breadcrumbs">
        <Link to="/">Maison</Link>
        <span>/</span>
        <span className="current">Skin Diagnostic</span>
      </div>

      <div className="page-hero">
        <span className="page-hero__tag">
          <Sparkles size={13} /> Algorithmic Haute Consultation
        </span>
        <h1 className="page-hero__title">
          The Bespoke <span className="gold-text-gradient">Skin Diagnostic</span>
        </h1>
        <p className="page-hero__desc">
          Answer 3 brief questions to decode your dermal profile and reveal your personalized Parisian beauty prescription.
        </p>
      </div>

      {!isCompleted ? (
        <div className="skin-test-wizard glass-panel">
          {/* Progress Indicator */}
          <div className="skin-test-progress">
            <div className="skin-test-progress__labels">
              <span>Step {step + 1} of {QUESTIONS.length}</span>
              <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div className="skin-test-progress__bar">
              <div
                className="skin-test-progress__fill"
                style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="skin-test-question">
            <span className="skin-test-question__num">0{step + 1}</span>
            <h2 className="skin-test-question__title">{QUESTIONS[step].title}</h2>

            <div className="skin-test-options">
              {QUESTIONS[step].options.map((option, idx) => (
                <button
                  key={idx}
                  className="skin-test-option-btn"
                  onClick={() => handleSelectOption(`step_${step}`, option.type || option.goal || option.texture)}
                >
                  <span className="skin-test-option-text">{option.label}</span>
                  <ArrowRight size={18} className="skin-test-option-icon" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="skin-test-results">
          <div className="skin-test-result-hero glass-panel">
            <div className="skin-test-result-badge">
              <CheckCircle2 size={18} /> Diagnostic Analysis Complete
            </div>
            <h2 className="skin-test-result-title">
              Your Prescribed <span className="gold-text-gradient">Celestial Glow Ritual</span>
            </h2>
            <p className="skin-test-result-desc">
              Based on your answers, your skin craves restorative humectants and lipid barrier reinforcement. 
              Our chemists have harmonized this 3-step day & evening ceremony for maximum cellular glow.
            </p>

            <div className="skin-test-result-actions">
              <Button
                variant="primary"
                size="lg"
                icon={ShoppingBag}
                onClick={handleAddAll}
              >
                {addedAll ? '✨ All Added to Shopping Bag!' : 'Add Complete Ritual To Bag'}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={RotateCcw}
                onClick={handleReset}
              >
                Retake Diagnostic
              </Button>
            </div>
          </div>

          <div className="skin-test-prescriptions">
            <div className="home-section__header">
              <div>
                <span className="section-tagline">Step-By-Step Ceremony</span>
                <h3 className="section-title">Prescribed Formulations</h3>
              </div>
            </div>

            <div className="products-grid">
              {recommendedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinTest;
