import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons

interface CareTakerCardProps {
    imageUrl: string;
    title: string;
    description: string;
    link?: string;
    rating?: number; // Optional rating prop
    onClick?: () => void; // Optional click handler
}

const CareTakerCard: React.FC<CareTakerCardProps> = ({ imageUrl, title, description, link, rating = 0, onClick }) => {
    // Function to render star icons based on rating
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center">
                {Array(fullStars).fill(<FaStar className="text-yellow-500" />)}
                {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
                {Array(emptyStars).fill(<FaRegStar className="text-yellow-500" />)}
                <span className='ml-2'>{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <div
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-80" // Fixed height for uniformity
            onClick={onClick}
        >
            <img src={imageUrl} alt={title} className="w-full h-40 object-cover" /> {/* Fixed height for image */}
            <div className="p-4 flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-2 truncate">{title}</h2> {/* Truncate title if necessary */}
                {rating !== undefined && (
                    <div className="mb-2">
                        {renderStars(rating)}
                    </div>
                )}
                <p className="text-gray-700 mb-4 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{description}</p> {/* Truncate description */}
                {link && (
                    <a href={link} className="text-dark-green font-medium hover:underline">
                        Learn More
                    </a>
                )}
            </div>
        </div>
    );
};

export default CareTakerCard;
