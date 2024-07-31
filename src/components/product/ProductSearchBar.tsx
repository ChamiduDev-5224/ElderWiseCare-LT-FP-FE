// SearchBar.tsx
import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

const ProductSearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="mb-6 fixed top-0 left-0 right-0 bg-white px-4 pt-20 pb-2 shadow-md z-10">
      <input
        type="text"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={onSearch}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default ProductSearchBar;


