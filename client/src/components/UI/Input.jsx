import React from 'react';

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;