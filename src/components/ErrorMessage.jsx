import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center my-6">
      {message || 'An unexpected error occurred. Please try again.'}
    </div>
  );
}