import React, { useState } from 'react';
import ProductSearchBar from './ProductSearchBar';
import ProductFilterSidebar from './ProductFilterSidebar';
import ProductCard from './ProductCard';
import ProductPagination from './ProductPagination';
import { Navbar } from '../common/Navbar';
import { useNavigate } from 'react-router-dom';
import ProductDetail from './ProductDetails';

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    imageUrl: string;
    description: string;
    comments: string[];
}
                                
const mockProducts: Product[] = [
    { id: 1, name: "2 Pack Diabetic Soft Cotton Socks Black", price: 100, rating: 4, imageUrl: 'https://www.silverts.com/media/catalog/product/cache/d08f18ff5b3a17fb8cdca04cc75471b0/s/v/sv19400_blk_0_miirdhqavcgavf5s_1.jpg', description: "The Diabetic soft cotton socks feature an extra wide stretch. They are designed to fit over very swollen feet while retaining their original shape. Made from a soft and stretchy fabric, these socks keep feet warm and protected without digging in or chaffing. These socks are a great option for those with diabetes, edema, leg or foot swelling or large calves.", comments: ['Comment 1', 'Comment 2'] },
    { id: 2, name: 'Mens Extra Extra Wide Slip Resistant Slippers', price: 200, rating: 5, imageUrl: 'https://www.silverts.com/media/catalog/product/cache/ab31a97019a4c5576f680347e66cd337/s/v/sv55105_svbcb_0_5_1.jpg', description: 'descrition is bettererer', comments: ['Comment 1', 'Comment 2'] },
    { id: 3, name: "Men's Flannel Hospital & Home Care Gown", price: 150, rating: 3, imageUrl: 'https://www.silverts.com/media/catalog/product/cache/ab31a97019a4c5576f680347e66cd337/s/v/sv50120_diop_0_1.jpg', description: "Rest Easy in these great adaptive men's flannel open back hospital gowns/nightshirt. Open back nightgowns/nightshirts feature a full back overlap with dome closures at each shoulder for full back coverage. These warm men's hospital gowns/patient gowns completely open up, allowing the individuals arms to be slid into the garment sleeves without ever having to raise/lower their arms or struggle with small neck openings. The back overlap is then folded over and domed/snapped into place. The domes are placed on the shoulders to avoid possible pressure points.Adaptive hospital gowns/sleepwear gowns by Silvert are terrific for elderly/seniors who are disabled or wheelchair dependent. Also known as Johnny shirts these favorites make a terrific gift. Great choice for nursing homes, home care and hospitals. Made of machine washable warm cotton flannelette.(100% Cotton) This item is usually offered in a oversize full figure plus size range.", comments: ['Comment 1', 'Comment 2'] },
    { id: 4, name: "Women's Open Back Textured Turtleneck", price: 1250, rating: 5, imageUrl: "https://www.silverts.com/media/catalog/product/cache/ab31a97019a4c5576f680347e66cd337/s/v/sv192_sv39_0_h3awd9t9khhaxre1.jpg", description: 'The Nail Brush with Suction Cup Base has an all nylon bristle brush. Two suction cups hold the brush securely in place on any smooth, flat surface', comments: ['Comment 1', 'Comment 2'] },
    { id: 5, name: 'BathMobile Folding & Shower Chair', price: 1700, rating: 4.5, imageUrl:"https://www.1800wheelchair.com/media/catalog/product/cache/499433b94b126cd34b318bac07b3c488/i/m/img_0481.jpg", description: "BathMobile is a super high-end designed folding shower and commode chair that comes apart (Tool-free) for easy travel. The BathMobile is lightweight making it super easy to travel. The Bathmobile's seat opening can be adjusted to accommodate your hygiene needs (when needing to clean from the side of the chair) It also offers optional extra seating cushions for extra comfort. The footrest is adjustable and footplates can swing upward for front transfers. The armrest can swing up for side transfers. The chair weighs 22 lbs and can support 286 lbs. Black injection molded plastic with stainless steel hardware.", comments: ['Comment 1', 'Comment 2'] },
    { id: 6, name: '13.5 lbs Wheelchair - Feather Chair', price: 2000, rating: 4, imageUrl: 'https://www.1800wheelchair.com/media/catalog/product/cache/499433b94b126cd34b318bac07b3c488/f/e/feathermanualgray_eb_worldslightestwheelchair_1_1000x1000_1.jpg', description: "At only 13.5 lbs., the Featherweight Wheelchair - Feather Chair™ is the lightest wheelchair on the planet. Using brand-new materials, the Feather Chair™ sets a new standard in lightweightness. Most people can lift this wheelchair into their car, truck, or SUV. Because it's so light, it is super easy to propel and push.Transporting the Feather Chair™ could not be easier. The chair folds down into a compact package of 29” x 28” x 15”. Optional, quick-release wheels allow a caregiver to remove the larger, back wheels with the push of the button making the chair even lighter and more compact. Standard features include wheel lock breaks, easily accessible by the seated user, at the front of the frame. We added additional hand breaks at the rear of the chair for the caregiver. These handbrakes provide the caregiver control, security, and convenience to stop or slow down the chair at any time even when descending or pausing on a slope.", comments: ['Comment 1', 'Comment 2'] },
    { id: 7, name: 'Bariatric Steel Folding Commode', price: 1000, rating: 2, imageUrl: "https://www.1800wheelchair.com/media/catalog/product/cache/499433b94b126cd34b318bac07b3c488/I/n/InventoryItem11138_400.jpg", description: "The Graham-Field bariatric steel folding commode, versatile 3-in-1 design can be used as a bedside commode, raised toilet seat or toilet safety frame ,welded steel construction provides strength and stability", comments: ['Comment 1', 'Comment 2'] },
    { id: 8, name: "Medline Commode Liner Absorbent Pad", price: 350, rating: 5, imageUrl: "https://www.1800wheelchair.com/media/catalog/product/cache/499433b94b126cd34b318bac07b3c488/c/o/commode-liner-1.jpg", description: 'Medline Commode liners can be used with most commode buckets. These liners include an absorbent pad which solidifies the waste and makes clean up easy and hygienic.', comments: ['Comment 1', 'Comment 2'] },
    { id: 9, name: 'Pants Up Easy Toilet Model - Freestanding', price: 250, rating: 3.1, imageUrl: "https://www.1800wheelchair.com/media/catalog/product/cache/499433b94b126cd34b318bac07b3c488/p/a/pants-up-easy-wall-frame-1_1.jpg", description: "As the leader in adaptive footwear, Silverts works closely with diabetic neurotherapy experts to design comfortable, adjustable slippers.  This extra wide sandal slipper is ideal for women in nursing homes, hospitals, or simply seeking a reliable indoor/ outdoor slipper.", comments: ['Comment 1', 'Comment 2'] },
    { id: 10, name: "Womens Easy Closure Indoors & Outdoors", price: 1150, rating: 4.5, imageUrl: "https://silverts.com/media/catalog/product/cache/ab31a97019a4c5576f680347e66cd337/s/v/sv15370_svnab_0_8.jpg", description: 'As the leader in adaptive footwear, Silverts works closely with diabetic neurotherapy experts to design comfortable, adjustable slippers.  This extra wide sandal slipper is ideal for women in nursing homes, hospitals, or simply seeking a reliable indoor/ outdoor slipper.', comments: ['Comment 1', 'Comment 2'] },
    { id: 11, name: "Deep and Wide Diabetic Slipper", price: 100, rating: 4.5, imageUrl: "https://www.silverts.com/media/catalog/product/cache/ab31a97019a4c5576f680347e66cd337/s/v/sv10160_sv3_0_5.jpg", description: 'Super Soft, Super Extra Wide Fit Warm Bootie Slipper for swollen feet and swollen ankles. A perfect choice for those who are diabetic and or have feet with edema. Adjustable closing strap that adjusts for swollen feet. Silverts Easy Touch Closures make footwear adjustable and easy to put on. Slip-resistant soles. Polar fleece with warm pile lining is wonderful for fragile skin and delicate skin. Washable. This boot slipper by Silverts is a great choice for elderly seniors with bunions, corns, hammer toes, foot edema, diabetes and podiatry foot problems. These make great slippers for patients in nursing home, in home rehabilitation centers, skilled nursing facilities, long term care facilities and for home care settings. This loose boot style slipper by Silverts makes a terrific post-op post surgery slipper.', comments: ['Comment 1', 'Comment 2'] },
    { id: 12, name: "Men's Open Back Hospital Gowns", price: 170, rating: 3.9, imageUrl: 'https://www.silverts.com/media/catalog/product/cache/ab31a97019a4c5576f680347e66cd337/s/v/sv50100_sv3_0_t5i18382zsge1peq.jpg', description: 'These adaptive hospital gowns feature a full back overlap with two dome closures at each shoulder. These adaptive hospital johnny gowns completely open up, allowing the individuals arms to be slid into the garment sleeves without ever having to raise/lower their arms or struggle with small neck openings.The back overlap is then folded over and domed/snapped into place. The domes are placed on the shoulders of these adaptive nightshirts to avoid possible pressure points. The full back overlap of this adaptive sleep gown provides complete comfort and discretion unlike traditional tie back hospital nightgowns. Adaptive hospital johnny gowns by Silvert are terrific for elderly/seniors who are disabled or wheelchair dependent. Patient gowns / medical gowns are a great choice for nursing homes, homecare or skilled nursing facilities.', comments: ['Comment 1', 'Comment 2'] },
    { id: 13, name: 'Invacare Premier Stand-Assist Sling', price: 120, rating: 4.7, imageUrl: 'https://www.1800wheelchair.com/media/catalog/product/cache/499433b94b126cd34b318bac07b3c488/2/1/21f0p7cwwxl.jpg', description: 'The Invacare Premier Series Stand-Assist Sling is ideal for quick toileting, weight bearing practice and transfers from bed to chair, or chair to bed for cooperative users who are partially dependent with 50% or greater weight-bearing capacity, and have head and neck control.', comments: ['Comment 1', 'Comment 2'] },
    { id: 14, name: 'Travel Bag for Move Lite Power Chair', price: 4500, rating: 3.2, imageUrl: "https://www.1800wheelchair.com/media/catalog/product/cache/499433b94b126cd34b318bac07b3c488/m/o/move-lite-bag.jpg", description: 'This is the exclusive travel bag for the Move Lite Power Chair.', comments: ['Comment 1', 'Comment 2'] },
    { id: 15, name: 'Charger for Feather Power Scooter', price: 560, rating: 3.2, imageUrl: "https://www.1800wheelchair.com/media/catalog/product/cache/499433b94b126cd34b318bac07b3c488/w/h/whatsapp_image_2023-03-01_at_1.52.42_pm_1.png", description: 'The Charger for Feather Power Scooter is for the Feather Mobility Scooter™ - Lightest Electric Scooter 37 lbs only.', comments: ['Comment 1', 'Comment 2'] },
    { id: 16, name: 'Drive Extra Firm Inner Spring Mattress', price: 320, rating: 4.6, imageUrl: "https://www.1800wheelchair.com/media/catalog/product/cache/499433b94b126cd34b318bac07b3c488/m/o/move-lite-bag.jpg", description: 'The Extra Firm Inner Spring Mattress by Drive Medical offers a high quality inner spring design ensuring you are at max comfort. The mattress has a vinyl cover that is waterproof, anti-bacterial and anti-static for convenience and ease of use. The mattress is made of Premium Grade cotton and a high-density urethane foam for maximum comfort and increased durability.', comments: ['Perfect and smooth item ', 'Receievd'] },

];

const Product: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [sortPrice, setSortPrice] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const productsPerPage = 8;

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleRatingFilter = (rating: number | null) => {
        setSelectedRating(rating);
    };

    const handlePriceSort = (order: string | null) => {
        setSortPrice(order);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleProductSelect = (productId: number) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setSelectedProduct(product);
            // Example: Redirect to the product detail page using React Router
            navigate(`/product/${productId}`);
        }
    };
    const filteredProducts = products.filter(product => {
        const isSelectedRatingDecimal = selectedRating !== null && !Number.isInteger(selectedRating);

        if (selectedRating === null) {
            return true;
        } else if (isSelectedRatingDecimal) {
            // Filter for decimal rating
            return product.rating === selectedRating;
        } else {
            // Filter for whole number rating
            return Math.floor(product.rating) === selectedRating;
        }
    });

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <ProductSearchBar searchTerm={searchTerm} onSearch={handleSearch} />
                <div className="flex pt-20">
                    <ProductFilterSidebar
                        selectedRating={selectedRating}
                        onRatingFilter={handleRatingFilter}
                        sortPrice={sortPrice}
                        onPriceSort={handlePriceSort}
                    />
                    {selectedProduct ? (
                        <ProductDetail />
                    ) : (
                        <div className="w-3/4 ml-auto  pt-20 ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {paginatedProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        imageUrl={product.imageUrl}
                                        onSelect={() => handleProductSelect(product.id)}
                                    />
                                ))}
                            </div>
                            <ProductPagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
