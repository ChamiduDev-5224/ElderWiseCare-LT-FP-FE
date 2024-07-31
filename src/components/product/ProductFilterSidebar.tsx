import React from 'react';

interface FilterSidebarProps {
  selectedRating: number | null;
  onRatingFilter: (rating: number | null) => void;
  sortPrice: string | null;
  onPriceSort: (order: string | null) => void;
}

const ProductFilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedRating,
  onRatingFilter,
  sortPrice,
  onPriceSort,
}) => {
  const filterByRating = (rating: number | null) => {
    onRatingFilter(rating);
  };

  return (
    <div className="fixed top-28 lg:top-36 left-4 w-1/4 px-4 pt-4 shadow-xl rounded-lg">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 text-dark-green">Filter by Rating</h3>
        <div className="flex flex-col xl:flex-row gap-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => filterByRating(rating)}
              className={`px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
                selectedRating === rating ? 'bg-dark-green text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {rating}★
            </button>
          ))}
          <button
            onClick={() => filterByRating(null)}
            className={`px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
              selectedRating === null ? 'bg-dark-green text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            All
          </button>
        </div>
      </div>
      <div className="mb-6 ">
        <h3 className="text-lg font-bold mb-2">Sort by Price</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onPriceSort('asc')}
            className={`px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
              sortPrice === 'asc' ? 'bg-dark-green text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Asc
          </button>
          <button
            onClick={() => onPriceSort('desc')}
            className={`px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
              sortPrice === 'desc' ? 'bg-dark-green text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Desc
          </button>
          <button
            onClick={() => onPriceSort(null)}
            className={`px-3 py-2 rounded-lg shadow-sm focus:outline-none ${
              sortPrice === null ? 'bg-dark-green text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            None
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterSidebar;
