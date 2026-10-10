import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  text: string;
  href?: string;
  variant?: 'outline' | '';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  text,
  href = '/contact/',
  variant = '',
  type,
  disabled,
  className = '',
  onClick,
}: ButtonProps) {
  if (type || onClick) {
    return (
      <button
        className={`button ${variant} ${className}`}
        type={type || 'button'}
        disabled={disabled}
        onClick={onClick}
      >
        <span>{text}</span>
      </button>
    );
  }
  return (
    <Link className={`button ${variant} ${className}`} href={href}>
      <span>{text}</span>
    </Link>
  );
}
