import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CategoryCard.css';

export const CategoryCard = ({ category }) => {
  return (
    <Link to={`/shop?category=${category.id}`} className="elane-category-item">
      <div className="elane-category-item__media">
        <img
          src={category.image}
          alt={category.name}
          className="elane-category-item__img"
          loading="lazy"
        />
      </div>

      <div className="elane-category-item__footer">
        <span className="elane-category-item__title">{category.name}</span>
        <span className="elane-category-item__arrow">
          <ArrowRight size={17} strokeWidth={1.4} />
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
