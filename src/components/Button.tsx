import React from 'react';
import { Button as HeadlessButton } from '@headlessui/react';
import { classNames } from '../utils/classNames';

type ButtonProps = {
  label: string;
  onClick: () => void;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  isLoading = false,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white';
      default:
        return '';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 text-sm';
      case 'medium':
        return 'px-5 py-3 text-base';
      case 'large':
        return 'px-7 py-4 text-lg';
      default:
        return '';
    }
  };

  return (
    <HeadlessButton
      onClick={onClick}
      disabled={isLoading || disabled}
      className={classNames(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold shadow-md transition-transform duration-300 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        getVariantClasses(),
        getSizeClasses(),
        isLoading || disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-2 text-sm">Processing...</span>
        </div>
      ) : (
        label
      )}
    </HeadlessButton>
  );
};

export default Button;
