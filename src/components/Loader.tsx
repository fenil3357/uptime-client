import React from 'react';

interface LoaderProps {
  size?: number; // Size of the loader
  color?: string; // Color of the loader
  message?: string; // Optional message to display below the loader
}

const Loader: React.FC<LoaderProps> = ({ size = 64, color = 'blue-500', message }) => {
  const spinnerSize = `${size}px`;
  const borderSize = `${size / 8}px`; // Dynamic border width based on size

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinner */}
      <div
        className={`border-t-transparent border-${color} animate-spin`}
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderWidth: borderSize,
          borderRadius: '50%',
          borderStyle: 'solid',
        }}
      ></div>

      {/* Message */}
      {message && <p className="text-center text-white text-sm">{message}</p>}
    </div>
  );
};

export default Loader;
