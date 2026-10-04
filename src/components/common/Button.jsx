import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'gold'
  size = 'md', // 'sm', 'md', 'lg'
  to,
  href,
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  ...props
}) => {
  const classNames = [
    'luxe-btn',
    `luxe-btn--${variant}`,
    `luxe-btn--${size}`,
    fullWidth ? 'luxe-btn--full' : '',
    disabled ? 'luxe-btn--disabled' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="luxe-btn__icon luxe-btn__icon--left" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      <span className="luxe-btn__text">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="luxe-btn__icon luxe-btn__icon--right" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classNames} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classNames} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
