import React, { useState } from 'react';
import { Navbar } from '../common/Navbar';
import { MdDeleteForever, MdEditCalendar } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { removeAllProducts, removeProduct } from '../../redux/slices/cart_slice';
import Toast from '../common/toast/Toast';

interface Product {
    id: number;
    name: string;
    unitPrice: number;
    imageUrl: string;
    qty: number;
}

interface UserInfo {
    street: string;
    cty: string;
    district: string;
    zipCode: string;
    fname: string;
    lname: string;
}

const ShoppingCart: React.FC = () => {
    const userInfo = useSelector((state: any) => state.auth.userInfo) as UserInfo;
    const cartInfo = useSelector((state: any) => state.cart.cartInfo) as Product[];
    const [cartProducts, setCartProducts] = useState<Product[]>(cartInfo);
    const [editable, setEditable] = useState(false);
    const [deliveryDetails, setDeliveryDetails] = useState<UserInfo>(userInfo);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({ message: '', type: 'info' });

    const dispatch = useDispatch();

    const handleDelete = (id: number) => {
        setCartProducts(cartProducts.filter(product => product.id !== id));
        dispatch(removeProduct(id));
    };

    const changeDeliveryDetails = () => {
        setEditable(!editable);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setDeliveryDetails(prevDetails => ({
            ...prevDetails,
            [id]: value
        }));
    };

    const handleSaveChanges = () => {
        setEditable(false);
    };

    const handleDeleteAll = () => {
        setCartProducts([]);
        dispatch(removeAllProducts());
    };

    const handleCheckout = () => {
        showToast('Cart successfully checkout.', 'success')
        setCartProducts([]);
        dispatch(removeAllProducts());
    };


    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
    };


    const totalQuantity = cartProducts.reduce((total, product) => total + product.qty, 0);
    const totalPrice = cartProducts.reduce((total, product) => total + product.unitPrice * product.qty, 0);

    return (
        <div>
            <Navbar />
            <Toast
                message={toast.message}
                type={toast.type}
                duration={5000}
                onClose={() => setToast({ message: '', type: 'info' })}
            />
            <div className="container mx-auto px-4 pt-24">
                <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
                <button onClick={handleDeleteAll} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mb-4 flex items-center">
                    <MdDeleteForever /> Delete All
                </button>
                {cartProducts.length === 0 ? (
                    <h4><strong>Your cart is empty.</strong></h4>
                ) : (
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-2/3 max-h-96 overflow-y-auto">
                            <ul className="divide-y divide-gray-200">
                                {cartProducts.map(product => (
                                    <li key={product.id} className="flex items-center justify-between p-4">
                                        <div className="flex items-center">
                                            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                                            <div>
                                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                                <p className="text-gray-600">${product.unitPrice.toFixed(2)}</p>
                                                <h6 className="text-gray-600"><strong>Qty:</strong> {product.qty}</h6>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete(product.id)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                            <MdDeleteForever className='w-5 h-5' />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='flex flex-col w-full md:w-2/6 mx-3'>
                            <div className="mt-4">
                                <div className='flex flex-row gap-4 pb-2'>
                                    <h3 className="text-lg font-bold mb-2">Cart Summary</h3>
                                    <img src="https://www.mastercard.us/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" width={60} height={60} alt="mastercard logo" />
                                    <img src="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png" width={60} height={60} alt="visa logo" />
                                    <img src="https://paykoko.com/img/logo1.7ff549c0.png" width={60} height={60} alt="koko logo" />
                                </div>

                                <div className="bg-gray-100 p-4 rounded shadow-md">
                                    <p className="text-gray-600">Total Quantity: {totalQuantity}</p>
                                    <p className="text-gray-600">Total Price: ${totalPrice.toFixed(2)}</p>

                                    <button onClick={handleCheckout} className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-600">
                                        Proceed to Checkout
                                    </button>
                                    <span className='text-sm mt-2'>All Island Delivery Fee: $25.00</span>
                                </div>
                            </div>
                            <div className='shadow-md p-2 mt-2 flex flex-col'>
                                <div className='self-end hover:cursor-pointer' onClick={changeDeliveryDetails}>
                                    <MdEditCalendar />
                                </div>
                                <div>
                                    <h1 className='text-2xl p-2 text-center'><strong>Shipping Details</strong></h1>
                                    <h4 className='font-semibold'>Personal Details</h4>

                                    <input type="text" className='py-2 pl-2 border-2 rounded-md mb-2 w-full' id='fname' placeholder='First Name' value={deliveryDetails.fname} onChange={handleChange} readOnly={!editable} />
                                    <input type="text" className='py-2 pl-2 border-2 rounded-md mb-2 w-full' id='lname' placeholder='Last Name' value={deliveryDetails.lname} onChange={handleChange} readOnly={!editable} />

                                    <h4 className='font-semibold'>Address Details</h4>
                                    <input type="text" className='py-2 pl-2 border-2 rounded-md mb-2 w-full' id='street' placeholder='Street 1' value={deliveryDetails.street} onChange={handleChange} readOnly={!editable} />
                                    <input type="text" className='py-2 pl-2 border-2 rounded-md mb-2 w-full' id='cty' placeholder='City' value={deliveryDetails.cty} onChange={handleChange} readOnly={!editable} />
                                    <input type="text" className='py-2 pl-2 border-2 rounded-md mb-2 w-full' id='zipCode' placeholder='Zipcode' value={deliveryDetails.zipCode} onChange={handleChange} readOnly={!editable} />
                                    <input type="text" className='py-2 pl-2 border-2 rounded-md mb-2 w-full' id='district' placeholder='District' value={deliveryDetails.district} onChange={handleChange} readOnly={!editable} />

                                    {editable && (
                                        <button onClick={handleSaveChanges} className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-600">
                                            Save Changes
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default ShoppingCart;
