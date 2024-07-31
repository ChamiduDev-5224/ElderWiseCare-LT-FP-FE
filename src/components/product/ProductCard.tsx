import React from 'react';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    rating: number;
    imageUrl: string;
    onSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, rating, imageUrl, onSelect }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-lg cursor-pointer">
            <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-600">${price}</p>
                <div className="flex items-center mt-2">
                    {[...Array(Math.floor(rating))].map((_, index) => (
                        <svg key={index} className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                            <path d="M10 15l-5.5 3 2-5.9L2 8h6L10 2l2 6h6l-4.5 4.1L15.5 18z" />
                        </svg>
                    ))}
                    {rating % 1 !== 0 && (
                        <svg className="w-5 h-5 fill-current text-yellow-500 ml-1" viewBox="0 0 20 20">
                            <path d="M10 15l-5.5 3 2-5.9L2 8h6L10 2v13z" />
                        </svg>
                    )} {rating.toFixed(1)}
                </div>
            </div>
            <button onClick={onSelect} className="block w-full py-2 bg-black text-white font-semibold focus:outline-none">
                Buy Now
            </button>
        </div>
    );
};

export default ProductCard;
